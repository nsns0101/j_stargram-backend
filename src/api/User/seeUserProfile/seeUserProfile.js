//유저정보보기
export default {
  Query: {
    seeUserProfile: (_, args, { prisma }) => {
      //유저검색
      return prisma.user({ id: args.id });
    }
  }
};
