import "./env"; //env.js
import { prisma } from "../generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";
// import logger from "morgan";
import schema from "./schema";
// import { sendSecretMail } from "./utils";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
// utils.js참고
//sendSecretMail(받는이메일, 암호)
// sendSecretMail("nsns0101@naver.com", "123");

//env파일의 PORT설정해 둔 것을 가져옴. 설정값이 없으면 default로 4000을 부여
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  //context는 resolver 사이에서 정보를 공유할 때 사용
  // context: { prisma } //모든 resolver에 prisma를 넘김
  context: ({ request }) => ({ request, isAuthenticated, prisma })
});

//GraphQLServer에는 express 서버가 내장되어 있음
// server.express.use(logger("dev"));

//모든 경로를 passport.authenticate('jwt')로 보호
// server.express.use(passport.authenticate("jwt"));
server.express.use(authenticateJwt); //로그인

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
