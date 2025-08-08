import React from 'react';

const rankData = [
  {
    season: '2024-08-16',
    competition: 'Premier League',
    standings: [
      { position: 1, team: 'Liverpool FC' },
      { position: 2, team: 'Arsenal FC' },
      { position: 3, team: 'Manchester City FC' },
      { position: 4, team: 'Chelsea FC' },
    ],
  },
];

const RankTablePage = () => {
  const { season, competition, standings } = rankData[0];

  //文字変換関数

  return (
    <div className="max-w-3xl mx-auto mt-16 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {competition} Rankings
        </h2>
        <p className="text-lg text-gray-500 mb-6">Season start: {season}</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-base">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-4 px-6 text-gray-600 font-semibold">順位</th>
                <th className="py-4 px-6 text-gray-600 font-semibold">チーム名</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((entry) => (
                <tr
                  key={entry.position}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">{entry.position}</td>
                  <td className="py-4 px-6 text-gray-800">{entry.team}</td>
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
