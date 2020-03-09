export default {
  Room: {
    participants: ({ id, prisma }) => prisma.room({ id }).participants(), //참가자 정보
    messages: ({ id, prisma }) => prisma.room({ id }).messages() //메시지 정보
  }
};
