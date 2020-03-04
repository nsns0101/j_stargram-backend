//유저정보보기
export default {
  Query: {
    seeUserProfile: async (_, args, { prisma }) => {
      const { id } = args;
      //유저검색
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      return {
        user,
        posts
      };
    }
  }
};
