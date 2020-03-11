//회원가입
export default {
  Mutation: {
    //{prisma}는 server.js 참고
    createAccount: async (_, args, { prisma }) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;

      //만드려고 하는 username 또는 email이 이미 있을 경우
      const unique_username = await prisma.$exists.user({ username });
      const unique_email = await prisma.$exists.user({ email });

      if (unique_username) {
        throw Error("만들려고 하시는 username은 이미 사용중입니다.");
      }
      if (unique_email) {
        throw Error("만들려고 하시는 email은 이미 사용중입니다.");
      }

      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      //위 prisma.createUser가 실패하면 알아서 return false를 뱉음
      return true;
    }
  }
};
