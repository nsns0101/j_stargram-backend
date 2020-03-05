//게시글 전체화면으로 보기(크게보기)
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;

      //해당하는 게시글 정보
      const post = await prisma.post({ id });

      //해당하는 게시글의 댓글정보
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);

      // //해당하는 게시글의 좋아요 정보
      // const likeCount = await prisma
      //   .likesConnection({
      //     where: { post: { id } }
      //   })
      //   .aggregate() //aggregate() : 자료를 범주별로 나누어서 각 범주에 대한 통계량을 구해줌
      //   .count();

      //해당하는 게시글의 파일(이미지) 정보
      const files = await prisma.post({ id }).files();

      //해당하는 게시글의 유저 정보
      const user = await prisma.post({ id }).user();

      return {
        post,
        comments,
        files,
        user
      };
    }
  }
};
