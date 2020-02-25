require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
//env파일의 PORT설정해 둔 것을 가져옴. 설정값이 없으면 default로 4000을 부여
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema
});

//GraphQLServer에는 express 서버가 내장되어 있음
// server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

//  localhost:4000에서
//  query{
//    sayHello
//    sayGoodbye
//  }
//  실행해보기
