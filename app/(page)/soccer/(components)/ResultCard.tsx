import React from "react";
import Image from "next/image";
import { FormattedMatch } from "@/app/(page)/soccer/(components)/(type)/matchesType";

type Props = { match: FormattedMatch };

const ResultCard: React.FC<Props> = ({ match }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white relative">
      <div className="absolute top-2 left-2 text-sm text-gray-500">
        第{match.matchday}節
      </div>

      {/* 日時 */}
      <div className="text-sm text-gray-500 text-center mb-2">
        {new Date(match.utcDate).toLocaleString("ja-JP", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {/* ホーム/アウェイチームとスコア */}
      <div className="grid grid-cols-3 items-center">
        {/* ホームチーム */}
        <div className="flex items-center gap-2 justify-start">
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.shortName}
            width={24}
            height={24}
            className="object-contain"
          />
          <span>{match.homeTeam.shortName}</span>
        </div>

        {/* スコア */}
        <div className="text-lg font-bold text-center">
          {match.score.fullTime.home} - {match.score.fullTime.away}
        </div>

        {/* アウェイチーム */}
        <div className="flex items-center gap-2 justify-end">
          <span>{match.awayTeam.shortName}</span>
          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.shortName}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
