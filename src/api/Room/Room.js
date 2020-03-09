export default {
  Room: {
    participants: ({ id, prisma }) => prisma.room({ id }).participants(),
    messages: ({ id, prisma }) => prisma.room({ id }).messages()
  }
};
