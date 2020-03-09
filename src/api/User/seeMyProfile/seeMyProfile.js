//내정보 보기
export default {
  Query: {
    //DoubleUnderScore(__)는 부모의 arguments를 뜻함
    seeMyProfile: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      //이 파일의 graph.ql참고
      return prisma.user({ id: user.id });
    }
  }
};
