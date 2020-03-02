//현재 파일과 env파일의 경로를 묶음
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
