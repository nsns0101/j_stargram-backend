//검색
//username이 jang이면 ang로도 검색이 가능함(jang에 ang가 포함됨)
//term이 검색하는 것( ex)ang )
import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      return prisma.users({
        where: {
          OR: [
            //밑의 세 조건중 만족하는 것을 전부 검색해줌
            { username_contains: args.term }, //username에 term이 포함될시
            { firstName_contains: args.term }, //firstName에 term이 포함될시
            { lastName_contains: args.term } //lastName에 term이 포함될시
          ]
        }
      });
    }
  }
};
