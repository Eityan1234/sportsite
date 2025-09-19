"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { RankData, Standing } from "../(components)/(type)/rankingType";

const RankTablePage = () => {
  const [rankData, setRankData] = useState<RankData[]>([]);
  const [season, setSeason] = useState<string>("");

  const { competition, standings } = rankData[0] || {
    competition: "",
    standings: [],
  };

  // データ成形
  const dataFormation = useCallback((data: RankData[]) => {
    if (data[0].season) {
      setSeason(formatSeason(data[0].season));
    }
  }, []);

  // APIよりデータ取得
  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch("/api/soccer/rankings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: RankData[] = await response.json();
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
  if (rankData.length === 0) {
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
          {competition} 順位表
        </h2>
        <p className="text-lg text-gray-500 mb-6">{season}シーズン</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="py-3 px-4 text-gray-600 font-semibold">順位</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  チーム
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  試合数
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  勝ち点
                </th>
                <th className="py-3 px-4 text-gray-600 font-semibold">勝</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">分</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">負</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">得点</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">失点</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">
                  得失点
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((entry: Standing) => (
                <tr
                  key={entry.position}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {entry.position}
                  </td>
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
                  <td className="py-3 px-4">{entry.playedGames}</td>
                  <td className="py-3 px-4 font-bold">{entry.points}</td>
                  <td className="py-3 px-4">{entry.won}</td>
                  <td className="py-3 px-4">{entry.draw}</td>
                  <td className="py-3 px-4">{entry.lost}</td>
                  <td className="py-3 px-4">{entry.goalsFor}</td>
                  <td className="py-3 px-4">{entry.goalsAgainst}</td>
                  <td className="py-3 px-4">{entry.goalDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RankTablePage;
