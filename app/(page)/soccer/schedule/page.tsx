"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  FormattedMatchesResponse,
  FormattedMatch,
} from "@/app/(page)/soccer/(components)/(type)/matchesType";
import ResultCard from "../(components)/ResultCard";
import ScheduleCard from "../(components)/ScheduleCard";

const SchedulePage = () => {
  const [matchesData, setMatchesData] =
    useState<FormattedMatchesResponse | null>(null);
  const [matches, setMatches] = useState<FormattedMatch[]>([]);
  const [season, setSeason] = useState<string>("");
  const { competition } = matchesData || {
    competition: { name: "", code: "" },
  };

  // シーズン変換
  const formatSeason = (startDate: string) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  // データ成形
  const dataFormation = useCallback((data: FormattedMatchesResponse) => {
    if (data.season) {
      setSeason(formatSeason(data.season));
    }
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/soccer/matches");
        if (!res.ok) throw new Error("Failed to fetch matches");

        const data: FormattedMatchesResponse = await res.json();
        setMatchesData(data);
        dataFormation(data);
        // 日付順にソート（古い順）
        const sorted = (data.matches ?? []).sort(
          (a, b) =>
            new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
        );
        setMatches(sorted);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, [dataFormation]);

  // データがない場合のローディング表示
  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-4 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {competition.name} 試合日程
        </h2>
        <p className="text-lg text-gray-500 mb-6">{season}シーズン</p>
        <div className="space-y-4">
          {matches.map((match) =>
            match.status === "FINISHED" ? (
              <ResultCard key={match.id} match={match} />
            ) : (
              <ScheduleCard key={match.id} match={match} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
