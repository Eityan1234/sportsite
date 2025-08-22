// チーム情報
export type ScorerTeam = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

// 各選手の得点データ（整形後）
export type ScorerEntry = {
  position: number; // 順位
  player: string; // 選手名
  team: ScorerTeam; // 所属チーム
  goals: number; // 得点数
  penalties: number | null; // PK得点数（nullあり）
};

// 整形後レスポンス
export type ScorersData = {
  season: string;
  competition: string;
  scorers: ScorerEntry[];
};

// APIそのままのレスポンス用型
export type RawScorersResponse = {
  count: number;
  filters: { season: string; limit: number };
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
    winner: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
    } | null;
  };
  scorers: {
    player: {
      id: number;
      name: string;
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      nationality?: string;
      section?: string;
      position?: string | null;
      shirtNumber?: number | null;
      lastUpdated?: string;
    };
    team: ScorerTeam;
    playedMatches: number;
    goals: number;
    assists: number | null;
    penalties: number | null;
  }[];
};
