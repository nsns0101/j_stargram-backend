import { prisma } from "../../../../generated/prisma-client";
import { generateSecret } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      //secret는 자동으로 생성되는 형용사 + 명사가 합쳐진 말
      const loginSecret = generateSecret();
      console.log(loginSecret);

      try {
        //현재 주어진 이메일을 위에서 생성된 loginsecret로 업데이트
        await prisma.updateUser({
          data: { loginSecret },
          where: { email }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
