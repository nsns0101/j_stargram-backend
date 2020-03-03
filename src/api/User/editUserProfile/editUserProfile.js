//edit profile
export default {
  Mutation: {
    editUserProfile: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
    }
  }
};
