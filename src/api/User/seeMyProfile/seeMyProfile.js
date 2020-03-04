import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    //DoubleUnderScore(__)는 부모의 arguments를 뜻함
    seeMyProfile: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const myProfile = await prisma.user({ id: user.id }); //내 프로필 정보
      const myPosts = await prisma.user({ id: user.id }).posts(); //내 게시글 정보
      //이 파일의 graph.ql참고
      return {
        user: myProfile,
        posts: myPosts
      };
    }
  }
};
