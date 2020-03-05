//게시글 전체화면으로 보기(크게보기)
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;

      //해당하는 게시글 정보
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
