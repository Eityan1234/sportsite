"use client";

import React from "react";
import { usePathname } from "next/navigation";
import CustomLink from "./custom-link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function MainNav() {
  const pathname = usePathname();

  const activeTextColor = "text-blue-500";
  const defaultTextColor = "text-violet11";

  const menuItems = [
    { href: "/soccer/rankTable", label: "順位表" },
     { href: "/soccer/goalTable", label: "得点ランキング" },
    { href: "#", label: "試合日程" },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 items-center fixed left-10 top-15">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-[40px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_5px_40px] shadow-blackA4 outline outline-black outline-offset-2 hover:bg-violet8 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Menu"
        >
          <HamburgerMenuIcon className="size-[30px]" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            className="min-w-[320px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
            sideOffset={5}
          >
            {menuItems.map(({ href, label }, idx) => (
              <React.Fragment key={href}>
                <CustomLink href={href}>
                  <DropdownMenuItem
                    className={`group relative flex h-[40px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[30px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 ${
                      pathname === href ? activeTextColor : defaultTextColor
                    }`}
                  >
                    {label}
                  </DropdownMenuItem>
                </CustomLink>
                {idx < menuItems.length - 1 && (
                  <div className="h-[1px] bg-gray-300 my-1"></div>
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
