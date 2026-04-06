export type CreateGameRequest = {
  gameType: string;
  status: string;
  winnerSlot: number;
  startedAt: string | null;
  endedAt: string | null;
  players: {
    slot: number;
    userId: string | null;
    solvedCount: number;
    isWinner: boolean;
    puzzles: {
      puzzleId: number;
      assignedOrder: number;
      solvedOrder: number | null;
      status: string;
      assignedAt: string | null;
      solvedAt: string | null;
    }[];
  }[];
};
