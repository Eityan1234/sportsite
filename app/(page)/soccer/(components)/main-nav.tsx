// app/(components)/main-nav.tsx
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TableChartIcon from "@mui/icons-material/TableChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";

export function MainNav() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuItems = [
    { href: "/soccer/rankTable", label: "順位表", icon: <TableChartIcon /> },
    {
      href: "/soccer/goalTable",
      label: "得点ランキング",
      icon: <EmojiEventsIcon />,
    },
    { href: "/soccer/schedule", label: "試合日程", icon: <EventIcon /> },
  ];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="menu"
        sx={{
          bgcolor: "white",
          "&:hover": { bgcolor: "grey.200" },
          boxShadow: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { minWidth: 240, boxShadow: 3 },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map(({ href, label, icon }) => (
          <MenuItem
            key={href}
            component={Link}
            href={href}
            selected={pathname === href}
            onClick={handleClose}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
