import express from "express";
import cors from "cors";
import { env } from "./lib/env";
import { supabaseAdmin } from "./lib/supabase";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200)
     .json({
        message: "Backend is working!",
        status : "OK",
     });
});

app.get("/supabase-test", async (_req, res) => {
  const { error } = await supabaseAdmin
    .from('game-results')
    .insert({
      game_type: 0,
      winner_user_id: 1
    });

    if (error)
    {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      error: "None"
    });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(env.port, () => {
  console.log(`API running on ${env.port}`);
});
