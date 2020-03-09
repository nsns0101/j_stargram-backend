//메시지 전송
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room; //채팅방

      //채팅방이 없을 경우
      if (roomId === undefined) {
        //자기한테 보내는 것이 아니여야함
        if (user.id == toId) {
          throw Error("자기자신에게는 메시지를 보낼 수 없습니다.");
        }
        //채팅방 생성
        room = await prisma.createRoom({
          //채팅방 참가자
          participants: {
            connect: [{ id: toId }, { id: user.id }] //채팅 받는 사람과 채팅 보내는 유저를 연결
          }
        });

        console.log(room);
      }
      //채팅방이 있는경우(채팅 받는 사람과 채팅 보내는 사람이 이미 연결됨)
      else {
        //메시지를 보내려고 하는 채팅방이 무엇인지를 찾아야함
        room = await prisma.room({ id: roomId });
      }
      //룸이 없을 경우
      if (!room) {
        throw Error("채팅방을 찾을 수 없습니다.");
      }
      //채팅유저 중에서 나와 이야기하는 사람들 중 첫번째 id
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      )[0];
      console.log(getTo.id);
      console.log(room.id);

      //메시지 생성
      return prisma.createMessage({
        text: message, //보낼 메시지
        //보내는 사람
        from: {
          connect: { id: user.id }
        },
        //받는 사람
        to: {
          connect: { id: roomId ? getTo.id : toId }
        },
        //이야기할 채팅방
        room: {
          connect: { id: room.id }
        }
      });
    }
  }
};
