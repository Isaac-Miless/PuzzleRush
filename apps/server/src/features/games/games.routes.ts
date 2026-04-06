import { Router } from "express";
import { createGame } from "./games.service";
import type { CreateGameRequest } from "@shared";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body as CreateGameRequest;

    if (!payload || !Array.isArray(payload.players)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid request body.",
      });
    }

    const result = await createGame(payload);

    return res.status(201).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create game.";

    return res.status(500).json({
      ok: false,
      error: message,
    });
  }
});

export default router;
