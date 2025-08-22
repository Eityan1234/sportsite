import { MatchesResponse } from "@/app/(page)/soccer/(components)/(type)/matchesType";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/PL/matches`,
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

  const raw: MatchesResponse = await res.json();

  const formatted = {
    competition: raw.competition,
    season: raw.filters.season,
    resultSet: raw.resultSet,
    matches: raw.matches.map((m) => ({
      id: m.id,
      utcDate: m.utcDate,
      status: m.status,
      matchday: m.matchday,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      score: m.score,
    })),
  };

  return NextResponse.json(formatted);
}
