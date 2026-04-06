import express from "express";
import cors from "cors";
import { env } from "./lib/env";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ok: true});
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(env.port, () => {
  console.log(`API running on ${env.port}`);
});
