import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import tweetRoutes from "./routes/tweets.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//미들웨어 정의
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//uploads 폴더 자동 생성
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

//라우터 핸들러
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/upload", uploadRoutes);

//status 체크
app.get("/health", (_, res) => res.json({ status: "ok" }));

//해당 라우팅 없을 때 - 404 에러
app.use((_, res) => res.status(404).json({ message: "Not Found" }));

//에러 핸들러
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server  →  http://localhost:${PORT}`);
});
