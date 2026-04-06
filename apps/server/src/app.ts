import express from "express";
import gamesRouter from "./features/games/games.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/games", gamesRouter);


export default app;
