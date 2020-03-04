export default {
  User: {
    //풀네임
    //parent는 상위 resolver가 return한 값을 그대로 가져오는 것인가?
    fullName: parent => {
      //   console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },

    //amIFollowing
    amIFollowing: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;

      try {
        const exists = await prisma.$exists.user({
          AND: [
            { id: parentId }, //
            { followers_some: [user.id] } //
          ]
        });
        //존재하면
        if (exists) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    //
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
