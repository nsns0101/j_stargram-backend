import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    //DoubleUnderScore(__)는 부모의 arguments를 뜻함
    seeMyProfile: (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      //현재 사용자의 정보를 가져옴
      return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
    }
  }
};
