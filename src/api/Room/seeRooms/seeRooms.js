import { ROOM_FRAGMENT } from "../../../fragments";

//채팅방 전부보기
export default {
  Query: {
    seeRooms: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request; //로그인 유저

      //나의 채팅방을 반환
      return prisma
        .rooms({
          where: {
            //participants = 채팅 참가자(models.graphql참고)
            //_some = 예를 들어 [1,2,3,4]가 있는데 이 4개 중 하나라도 포함된 개체를 찾음
            participants_some: {
              id: user.id
            }
          }
        })
        .$fragment(ROOM_FRAGMENT);
    }
  }
};
