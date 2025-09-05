"use client";

import React, { useEffect, useState } from "react";
import { Conference } from "./(components)/(type)/standingsType";

const StandingsTablePage = () => {
  const [rankData, setRankData] = useState<Conference[]>([]);

  // APIよりデータ取得
  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch("/api/football/standings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Conference[] = await response.json();
        setRankData(data);
      } catch (error) {
        console.warn("Error fetching rank data:", error);
      }
    };
    fetchRankData();
  }, []);

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
      {rankData.map((conf) => (
        <div key={conf.conference} className="bg-white rounded-3xl shadow-xl p-10 mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {conf.conference} 順位表
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="py-3 px-4 text-gray-600 font-semibold">チーム</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">カンファレンス勝</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">カンファレンス負</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">総勝</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">総敗</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">得点</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">失点</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">ホーム戦績</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">アウェイ戦績</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">連勝/連敗</th>
                </tr>
              </thead>
              <tbody>
                {conf.standings.map((team, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-all">
                    <td className="py-3 px-4 text-gray-800 font-medium">{team.school}</td>
                    <td className="py-3 px-4">{team.conferenceWins}</td>
                    <td className="py-3 px-4">{team.conferenceLosses}</td>
                    <td className="py-3 px-4">{team.overallWins}</td>
                    <td className="py-3 px-4">{team.overallLosses}</td>
                    <td className="py-3 px-4">{team.pointsFor}</td>
                    <td className="py-3 px-4">{team.pointsAgainst}</td>
                    <td className="py-3 px-4">{team.homeRecord}</td>
                    <td className="py-3 px-4">{team.awayRecord}</td>
                    <td className="py-3 px-4">{team.streak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StandingsTablePage;
