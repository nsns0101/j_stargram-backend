//토큰발급
// import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
export default {
  Mutation: {
    //{prisma}는 server.js 참고
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      console.log(email, secret);
      //입력한 email에 해당하는 user정보를 get
      const user = await prisma.user({ email });

      //받은 user정보에서 loginSecret가 입력한 secret와 같은지 판단
      if (user.loginSecret === secret) {
        //JWT(Json Web Token)
        const token = generateToken(user.id);
        return token;
      } else {
        return Error("Wrong email/secret conviation");
      }
    }
  }
};
