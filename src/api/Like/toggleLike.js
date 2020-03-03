//좋아요 투표시 실행되는 함수
import { isAuthenticated } from "../../middlewares";
import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      //   console.log(request);

      //로그인 상태인지를 확인
      isAuthenticated(request);

      const { postId } = args;
      const { user } = request;
      //투표하였는지를 판단하기 위한 옵션
      const filterOption = {
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
      };
      //prisma의 $exists는 사용중인지를 체크
      try {
        //좋아요 투표를 했는지 하지않았는지를 확인
        const existingLike = await prisma.$exists.like(filterOption);

        //좋아요를 이미 투표하였을 경우 투표한 것을 삭제(-1)
        if (existingLike) {
          await prisma.deleteManyLikes(filterOption);
        }
        //좋아요 투표를 하지 않았을 경우 투표를 추가(+1)
        else {
          await prisma.createLike({
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
