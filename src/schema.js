import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

//현재 폴더명/api에 있는 모든 폴더의 모든 .graphql파일들
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
console.log(allTypes);
//api밑에는 resolver가 아닌 js파일을 두지 않는다는 조건.
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

//schema에 typeDefs, resolvers를 정의
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
