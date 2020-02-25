require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

//env파일의 PORT설정해 둔 것을 가져옴. 설정값이 없으면 default로 4000을 부여
const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello : String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "HELLO"
  }
};
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
