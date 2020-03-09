//채팅방 보기
export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        //participants = 채팅 참가자(models.graphql참고)
        //_some = 예를 들어 [1,2,3,4]가 있는데 이 4개 중 하나라도 포함된 개체를 다 찾음
        participants_some: {
          id: user.id
        }
      });
      //참여하고 있는 채팅방이 있으면
      if (canSee) {
        //검색한 채팅방의 정보를 보여줌(채팅방, 메시지 = ROOM_FRAGMENT참고)
        return prisma.room({ id });
      }
      //참여하고 있는 채팅방이 없으면
      else {
        throw Error("You can't see this");
      }
    }
  }
};
