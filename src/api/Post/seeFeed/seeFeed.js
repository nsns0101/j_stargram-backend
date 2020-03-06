//나의 Feed보기
export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      //내가 팔로우하고 있는 사람의 정보
      const following = await prisma.user({ id: user.id }).following();

      //내가 팔로우하고 있는 사람의 id(나의 id도 포함됨)
      //   console.log([...following.map(user => user.id), user.id]);

      return prisma.posts({
        where: {
          user: {
            //내가 팔로우하고 있는 사람의 id(나의 id도 포함됨)
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        //작성날짜 순으로 정렬(default : 내림차순?)
        orderBy: "createdAt_DESC"
      });
    }
  }
};
