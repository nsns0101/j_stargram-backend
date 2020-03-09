import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: ({ id }) => prisma.message({ id }).from(), //보내는 사람 정보
    to: ({ id }) => prisma.message({ id }).to(), //받는 사람 정보
    room: ({ id }) => prisma.message({ id }).room() //채팅방 정보
  }
};
