export default {
  //게시글-------------------------------------------------------------------------------------------------------------------
  Post: {
    //isLiked
    //내가 좋아요한 글인지?
    isLiked: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;
      //좋아요가 있는지를 판단
      return prisma.$exists.like({
        AND: [
          { user: { id: user.id } }, // 2) 내 id의 좋아요가 있는지
          { post: { id: parentId } } // 1) 현재 게시글에
        ]
      });
    },

    //좋아요 수
    likeCount: async (parent, _, { prisma }) => {
      // console.log(prisma);
      return prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count();
    }
  }
};
