//유저정보보기
export default {
  Query: {
    seeUserProfile: async (_, args, { prisma }) => {
      const { id } = args;

      //유저 정보를 반환
      return prisma.user({ id });
    }
  }
};
