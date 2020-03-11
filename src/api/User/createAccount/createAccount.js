//회원가입
export default {
  Mutation: {
    //{prisma}는 server.js 참고
    createAccount: async (_, args, { prisma }) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      return prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
    }
  }
};
