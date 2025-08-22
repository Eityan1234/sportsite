// 試合のスコア
export type MatchScore = {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT" | "UNKNOWN";
  fullTime: { home: number | null; away: number | null };
  halfTime: { home: number | null; away: number | null };
};

// チーム情報
export type MatchTeam = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

// 審判情報
export type Referee = {
  id: number;
  name: string;
  type: string;
  nationality: string;
};

// 各試合
export type Match = {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null | { id: number; name: string; crest?: string };
  };
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELED";
  matchday: number;
  stage: string | null;
  group: string | null;
  lastUpdated: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  score: MatchScore;
  odds: { msg: string };
  referees: Referee[];
};

// API全体レスポンス
export type MatchesResponse = {
  filters: { season: string };
  resultSet: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  matches: Match[];
};


export type FormattedMatch = {
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELED";
  matchday: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
};

export type FormattedMatchesResponse = {
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: string; 
  resultSet: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  matches: FormattedMatch[];
};
