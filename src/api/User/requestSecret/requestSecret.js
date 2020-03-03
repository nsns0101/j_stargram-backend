//utils에서 만들어진 것들을 실행
//회원가입 메일보내기
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    //{prisma}는 server.js 참고
    requestSecret: async (_, args, { prisma }) => {
      const { email } = args;
      //secret는 자동으로 생성되는 형용사 + 명사가 합쳐진 말
      const loginSecret = generateSecret();
      console.log(loginSecret);

      try {
        //현재 주어진 이메일을 위에서 생성된 loginsecret로 업데이트
        await sendSecretMail(email, loginSecret);
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
