export type TeamStanding = {
  "School": string;
  "Conference W": string;
  "Conference L": string;
  "Overall W": string;
  "Overall L": string;
  "Overall PF": string;
  "Overall PA": string;
  "Overall HOME": string;
  "Overall AWAY": string;
  "Overall STREAK": string;
};

export type ConferenceStanding = {
  conference: string;
  standings: TeamStanding[];
};

export type StandingsResponse = {
  sport: string;
  title: string;
  updated: string;
  page: number;
  pages: number;
  data: ConferenceStanding[];
};


// フロントで扱いやすい型
export type Team = {
  school: string;
  conferenceWins: number;
  conferenceLosses: number;
  overallWins: number;
  overallLosses: number;
  pointsFor: number;
  pointsAgainst: number;
  homeRecord: string;
  awayRecord: string;
  streak: string;
};

export type Conference = {
  conference: string;
  standings: Team[];
};
