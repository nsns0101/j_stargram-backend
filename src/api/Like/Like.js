export default {
  Like: {
    post: ({ id, prisma }) => prisma.like({ id }).post(), //게시글 정보
    user: ({ id, prisma }) => prisma.like({ id }).user() //좋아요한 유저 정보
  }
};
