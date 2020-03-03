//언팔로우
export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated, prisma }) => {
      //로그인이 필요한 서비스
      isAuthenticated(request);

      const { id } = args; //언팔하려는 유저의 아이디
      const { user } = request; //현재사용자
      try {
        //유저를 업데이트
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id
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
