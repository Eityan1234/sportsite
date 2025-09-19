// 1チームの成績（順位表の1行）
export type Standing = {
  position: number;            // 順位
  team: {
    id: number;                // チームID
    name: string;              // チーム名
    shortName: string;         // 短縮名
    tla: string;               // 3文字略称 (例: CHE)
    crest: string;             // エンブレムURL
  };
  playedGames: number;         // 試合数
  form?: string;               // 直近の戦績 (例: "W,W,L,W,W")
  won: number;                 // 勝利数
  draw: number;                // 引き分け数
  lost: number;                // 敗戦数
  points: number;              // 勝ち点
  goalsFor: number;            // 得点
  goalsAgainst: number;        // 失点
  goalDifference: number;      // 得失点差
};

// APIから整形後に使うデータ全体
export type RankData = {
  season: string;
  competition: string;         // プレミアリーグなど
  standings: Standing[];       // 順位表
};

// Football-Data.org のレスポンスそのままの型
export type StandingsResponse = {
  season: {
    startDate: string;
  };
  competition: {
    name: string;
  };
  standings: {
    table: Standing[];
  }[];
};
