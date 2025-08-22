"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ScorersData, ScorerEntry } from "../(components)/(type)/scorersType";

const GoalTablePage = () => {
  const [rankData, setRankData] = useState<ScorersData | null>(null);
  const [season, setSeason] = useState<string>("");

  // データ成形
  const dataFormation = useCallback((data: ScorersData) => {
    if (data.season) {
      setSeason(formatSeason(data.season));
    }
  }, []);

  // APIよりデータ取得
  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch("/api/soccer/scorers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ScorersData = await response.json();
        setRankData(data);
        dataFormation(data);
      } catch (error) {
        console.warn("Error fetching rank data:", error);
      }
    };
    fetchRankData();
  }, [dataFormation]);

  // シーズン変換
  const formatSeason = (startDate: string) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  // データがない場合のローディング表示
  if (!rankData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  const { competition, scorers } = rankData;

  return (
    <div className="max-w-5xl mx-auto mt-4 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {competition} 得点ランキング
        </h2>
        <p className="text-lg text-gray-500 mb-6">{season}シーズン</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="py-3 px-4 text-gray-600 font-semibold">順位</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  選手名
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  所属チーム
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  得点数
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  PK得点数
                </th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((entry: ScorerEntry) => (
                <tr
                  key={entry.position}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {entry.position}
                  </td>
                  <td className="py-3 px-4">{entry.player}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Image
                      src={entry.team.crest}
                      alt={entry.team.name}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800">
                      {entry.team.shortName}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold">{entry.goals}</td>
                  <td className="py-3 px-4">
                    {entry.penalties ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GoalTablePage;
