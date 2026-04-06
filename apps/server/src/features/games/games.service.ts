import { supabaseAdmin } from "../../lib/supabase";
import { MAX_PLAYERS, type CreateGameRequest } from "@shared";

export async function createGame(payload: CreateGameRequest) {
  if (payload.players.length !== MAX_PLAYERS) {
    throw new Error(`Game must have exactly ${MAX_PLAYERS} players.`);
  }

  const winnerExists = payload.players.some(
    (player) => player.slot === payload.winnerSlot
  );

  if (!winnerExists) {
    throw new Error("winnerSlot must match one of the players.");
  }

  const slots = payload.players.map((player) => player.slot);
  const uniqueSlots = new Set(slots);

  if (uniqueSlots.size !== slots.length) {
    throw new Error("Player slots must be unique.");
  }

  // STEP 1: Insert game
  const { data: createdGame, error: gameError } = await supabaseAdmin
    .from("games")
    .insert({
      game_type: payload.gameType,
      winner_slot: payload.winnerSlot,
      started_at: payload.startedAt,
      ended_at: payload.endedAt,
      status: payload.status,
    })
    .select("id")
    .single();

  if (gameError || !createdGame) {
    throw new Error(gameError?.message ?? "Failed to create game.");
  }

  const gameId = createdGame.id;

  // STEP 2: Insert players
  const gamePlayerRows = payload.players.map((player) => ({
    game_id: gameId,
    user_id: player.userId,
    slot: player.slot,
    display_name: player.displayName,
    solved_count: player.solvedCount,
    is_winner: player.isWinner,
    hints_used: player.hintsUsed,
  }));

  const { data: createdGamePlayers, error: gamePlayersError } =
    await supabaseAdmin
      .from("game_players")
      .insert(gamePlayerRows)
      .select("id, slot");

  if (gamePlayersError || !createdGamePlayers) {
    throw new Error(
      gamePlayersError?.message ?? "Failed to create game players."
    );
  }

  // STEP 3: Insert puzzles
  const puzzleRows = payload.players.flatMap((player) => {
    const matchingGamePlayer = createdGamePlayers.find(
      (createdPlayer) => createdPlayer.slot === player.slot
    );

    if (!matchingGamePlayer) {
      throw new Error(`Could not find game player for slot ${player.slot}.`);
    }

    return player.puzzles.map((puzzle) => ({
      game_player_id: matchingGamePlayer.id,
      puzzle_id: puzzle.puzzleId,
      assigned_order: puzzle.assignedOrder,
      solved_order: puzzle.solvedOrder,
      status: puzzle.status,
      assigned_at: puzzle.assignedAt,
      solved_at: puzzle.solvedAt,
    }));
  });

  const { error: puzzlesError } = await supabaseAdmin
    .from("game_player_puzzles")
    .insert(puzzleRows);

  if (puzzlesError) {
    throw new Error(puzzlesError.message);
  }

  return {
    ok: true,
    gameId,
  };
}
