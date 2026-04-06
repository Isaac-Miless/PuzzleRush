import { GAME_STATUSES, PLAYER_SLOTS } from "../constants/game.constants";

export type PlayerSlot = typeof PLAYER_SLOTS[number];

export type GameStatus = typeof GAME_STATUSES[number];

export type CreateGameRequest = {
  gameType: number;
  winnerSlot: number;
  startedAt: string;
  endedAt: string;
  status: string;
  players: {
    userId: number;
    slot: number;
    displayName: string;
    solvedCount: number;
    isWinner: boolean;
    hintsUsed: number;
    puzzles: {
      puzzleId: number;
      assignedOrder: number;
      solvedOrder: number | null;
      status: number;
      assignedAt: string;
      solvedAt: string | null;
    }[];
  }[];
};
