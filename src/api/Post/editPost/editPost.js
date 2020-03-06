export default {
  Mutation: {
    editPost: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);

      const { id, caption, location, action } = args;
      const { user } = request;
      //검색한 게시글이 자기의 게시글인지의 여부
      const post = await prisma.$exists.post({ id, user: { id: user.id } });

      //자기 게시글이면 작업가능
      if (post) {
        //수정이면
        if (action === "EDIT") {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        }
        //삭제면
        else if (action === "DELETE") {
          return prisma.deletePost({ id });
        }
      }
      //자기 게시글이 아니면 에러발생
      else {
        throw Error("You cat't do that");
      }
    }
  }
};
