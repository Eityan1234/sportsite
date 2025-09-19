import { StandingsResponse } from "@/app/(page)/basketball/(components)/Rankings";
import { NextResponse } from "next/server";

export async function GET() {


  const res = await fetch(
    `https://ncaa-api.henrygd.me/standings/basketball-men/d1`,
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch standings: ${res.statusText}` },
      { status: res.status }
    );
  }

  const raw: StandingsResponse = await res.json();


  const formatted = raw.data.map((conf) => ({
  conference: conf.conference,
  standings: conf.standings.map((t) => ({
    school: t["School"],
    conferenceWins: Number(t["Conference W"]),
    conferenceLosses: Number(t["Conference L"]),
    overallWins: Number(t["Overall W"]),
    overallLosses: Number(t["Overall L"]),
    pointsFor: Number(t["Overall PF"]),
    pointsAgainst: Number(t["Overall PA"]),
    homeRecord: t["Overall HOME"],
    awayRecord: t["Overall AWAY"],
    streak: t["Overall STREAK"],
  })),
}));


  return NextResponse.json(formatted);
}