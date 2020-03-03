//팔로우
export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated, prisma }) => {
      //로그인이 필요한 서비스
      isAuthenticated(request);

      const { id } = args; //팔로우하려는 유저의 아이디
      const { user } = request; //현재 사용자
      try {
        //유저를 업데이트
        await prisma.updateUser({
          where: { id: user.id }, //어떤유저를? : 현재 사용자
          data: {
            //무슨 값을 바꿈?
            following: {
              //following 데이터를
              connect: {
                id //선택한 유저의 id를 팔로우
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
