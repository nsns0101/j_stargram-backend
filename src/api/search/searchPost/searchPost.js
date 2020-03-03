//게시글 검색(코드해석은 searchUser참고)
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            //starts_with : 시작되는 문자열로 찾기

            //location이 Seoul이면
            //        Se로 검색하면 검색이 되고
            //        oul로 검색하면 검색이 안됨
            { location_starts_with: args.term },
            //caption이
            { caption_starts_with: args.term }
          ]
        }
      })
  }
};
