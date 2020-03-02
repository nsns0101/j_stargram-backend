import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      //   console.log(request);

      //로그인 상태인지를 확인
      isAuthenticated(request);

      const { postId } = args;
      const { user } = request;
      //prisma의 $exists는 사용중인지를 체크
      try {
        //좋아요 투표를 했는지 하지않았는지를 확인
        const existingLike = await prisma.$exists.like({
          //둘다 만족할 때(현재 게시글에 유저가 투표를 했는지)
          AND: [
            //조건1 : 사용자 ID를 가진 좋아요가 이미 있는 경우
            {
              user: {
                id: user.id
              }
            },
            //조건2 : 게시글 ID를 가진 게시물이 있을 때
            {
              post: {
                id: postId
              }
            }
          ]
        });
        // existingLike = TRUE
        if (existingLike) {
          //todo
        }
        // existingLike = FALSE
        else {
          //투표안했으면 좋아요를 생성
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
