export default {
  Message: {
    from: ({ id, prisma }) => prisma.message({ id }).from(), //보내는 사람 정보
    to: ({ id, prisma }) => prisma.message({ id }).to(), //받는 사람 정보
    room: ({ id, prisma }) => prisma.message({ id }).room() //채팅방 정보
  }
};
