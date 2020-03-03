//댓글 작성
import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      //댓글 작성
      const comment = await prisma.createComment({
        //댓글의 user.id에 user.id추가
        user: {
          connect: {
            id: user.id
          }
        },
        //댓글의 post.id에 postId추가
        post: {
          connect: {
            id: postId
          }
        },
        //텍스트(내용) 추가
        text
      });
      return comment;
    }
  }
};
