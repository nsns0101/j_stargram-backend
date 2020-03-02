import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { GraphQLServer } from "graphql-yoga";
// import logger from "morgan";
import schema from "./schema";
// import { sendSecretMail } from "./utils";
import passport from "passport";
import "./passport";
// utils.js참고
//sendSecretMail(받는이메일, 암호)
// sendSecretMail("nsns0101@naver.com", "123");

//env파일의 PORT설정해 둔 것을 가져옴. 설정값이 없으면 default로 4000을 부여
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema
});

//GraphQLServer에는 express 서버가 내장되어 있음
// server.express.use(logger("dev"));

//모든 경로를 passport.authenticate('jwt')로 보호
server.express.use(passport.authenticate("jwt"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
