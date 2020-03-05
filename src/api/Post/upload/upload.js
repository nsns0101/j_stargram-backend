export default {
  Mutation: {
    upload: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;

      //게시글 생성
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });

      //파일 업로드
      files.forEach(async file => {
        await prisma.createFile({
          url: file, //url은 이미지 주소
          //게시글에 파일을 연결
          post: {
            connect: {
              id: post.id
            }
          }
        });
      });
      return post;
    }
  }
};
