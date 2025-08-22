import React from "react";
import Image from "next/image";
import { FormattedMatch } from "@/app/(page)/soccer/(components)/(type)/matchesType";

type Props = { match: FormattedMatch };

const ScheduleCard: React.FC<Props> = ({ match }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
      {/* 上部に節を表示 */}
      <div className="text-sm text-gray-500 mb-2">第{match.matchday}節</div>

      {/* ホーム/アウェイチーム */}
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

        {/* 日時 */}
        <div className="text-lg font-bold text-center">
          {new Date(match.utcDate).toLocaleString("ja-JP", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
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

export default ScheduleCard;
