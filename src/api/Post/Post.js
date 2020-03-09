import { prisma } from "../../../generated/prisma-client";
export default {
  //게시글-------------------------------------------------------------------------------------------------------------------
  Post: {
    files: ({ id }) => prisma.post({ id }).files(), //게시글의 파일정보
    comments: ({ id }) => prisma.post({ id }).comments(), //게시글의 댓글정보
    user: ({ id }) => prisma.post({ id }).user(), //게시글 작성자 정보
    likes: ({ id }) => prisma.post({ id }).likes(), //게시글 좋아요한 사람들 정보
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
