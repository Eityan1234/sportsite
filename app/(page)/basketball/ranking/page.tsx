"use client";

import React, { useEffect, useState } from "react";
import { Conference } from "@/app/(page)/basketball/(components)/Rankings";

// MUIコンポーネントのimport
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const StandingsTablePage = () => {
  const [rankData, setRankData] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch("/api/basketball");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Conference[] = await response.json();
        setRankData(data);
      } catch (error) {
        console.warn("Error fetching rank data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRankData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" mt={4} px={2}>
      {rankData.map((conf) => (
        <Paper key={conf.conference} elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {conf.conference} 順位表
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>チーム</TableCell>
                  <TableCell>カンファレンス勝</TableCell>
                  <TableCell>カンファレンス負</TableCell>
                  <TableCell>総勝</TableCell>
                  <TableCell>総敗</TableCell>
                  <TableCell>得点</TableCell>
                  <TableCell>失点</TableCell>
                  <TableCell>ホーム戦績</TableCell>
                  <TableCell>アウェイ戦績</TableCell>
                  <TableCell>連勝/連敗</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conf.standings.map((team, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{team.school}</TableCell>
                    <TableCell>{team.conferenceWins}</TableCell>
                    <TableCell>{team.conferenceLosses}</TableCell>
                    <TableCell>{team.overallWins}</TableCell>
                    <TableCell>{team.overallLosses}</TableCell>
                    <TableCell>{team.pointsFor}</TableCell>
                    <TableCell>{team.pointsAgainst}</TableCell>
                    <TableCell>{team.homeRecord}</TableCell>
                    <TableCell>{team.awayRecord}</TableCell>
                    <TableCell>{team.streak}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default StandingsTablePage;
