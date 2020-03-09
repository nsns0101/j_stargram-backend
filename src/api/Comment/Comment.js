import { prisma } from "../../../generated/prisma-client";
export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(), //댓글 작성한 유저 정보
    post: ({ id }) => prisma.comment({ id }).post() //작성한 댓글을 가지고 있는 게시글 정보
  }
};
