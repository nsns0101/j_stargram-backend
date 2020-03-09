export default {
  Comment: {
    user: ({ id, prisma }) => prisma.comment({ id }).user(), //댓글 작성한 유저 정보
    post: ({ id, prisma }) => prisma.comment({ id }).post() //작성한 댓글을 가지고 있는 게시글 정보
  }
};
