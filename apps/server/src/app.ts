import express from "express";
import cors from "cors";
import gamesRouter from "./features/games/games.routes";

const app = express();

// TODO: (LATER) Restrict CORS to only front-end URL
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/games", gamesRouter);

export default app;
