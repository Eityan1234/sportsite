import { StandingsResponse } from "@/app/(page)/soccer/(components)/(type)/rankingType";
import { NextResponse } from "next/server";

function getCurrentPLSeasonStartYear(date: Date = new Date()): number {
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  if (month <= 6) {
    return year - 1;
  }
  return year;
}

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  //今シーズンの取得
  const seasonStart = getCurrentPLSeasonStartYear(); 

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/PL/standings?season=${seasonStart}`,
    {
      headers: {
        "X-Auth-Token": apiKey,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch standings: ${res.statusText}` },
      { status: res.status }
    );
  }

  const raw: StandingsResponse = await res.json();

  const formatted = [
    {
      season: raw.season.startDate,
      competition: raw.competition.name,
      standings: raw.standings[0].table.map((t) => ({
        position: t.position,
        team: {
          id: t.team.id,
          name: t.team.name,
          shortName: t.team.shortName,
          tla: t.team.tla,
          crest: t.team.crest,
        },
        playedGames: t.playedGames,
        form: t.form,
        won: t.won,
        draw: t.draw,
        lost: t.lost,
        points: t.points,
        goalsFor: t.goalsFor,
        goalsAgainst: t.goalsAgainst,
        goalDifference: t.goalDifference,
      })),
    },
  ];

  return NextResponse.json(formatted);
}
