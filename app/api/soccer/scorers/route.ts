import { RawScorersResponse, ScorersData } from "@/app/(page)/soccer/(components)/(type)/scorersType";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/PL/scorers`,
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

  const raw: RawScorersResponse = await res.json();

  const formatted: ScorersData = {
    season: raw.season.startDate,
    competition: raw.competition.name,
    scorers: raw.scorers.map((s, index) => ({
      position: index + 1,
      player: s.player.name,
      team: {
        id: s.team.id,
        name: s.team.name,
        shortName: s.team.shortName,
        tla: s.team.tla,
        crest: s.team.crest,
      },
      goals: s.goals,
      penalties: s.penalties,
    })),
  };

  return NextResponse.json(formatted);
}
