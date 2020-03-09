//게시글 전체화면으로 보기(크게보기)
export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;

      //해당하는 게시글 정보
      return prisma.post({ id });
    }
  }
};
