//토큰발급
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      console.log(email, secret);
      //입력한 email에 해당하는 user정보를 get
      const user = await prisma.user({ email });

      //받은 user정보에서 loginSecret가 입력한 secret와 같은지 판단
      if (user.loginSecret === secret) {
        //JWT
        return "TOKEN";
      } else {
        return Error("Wrong email/secret conviation");
      }
    }
  }
};
