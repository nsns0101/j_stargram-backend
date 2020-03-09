//채팅방에 새로운 메시지가 뜨면 새로고침없이 받을 수 있다?
export default {
  Subscription: {
    //Subscription은
    //newMessage:(_,args, ~~) 이렇게 쓰지않고
    //newMessage : { subscribe : (_,args, ~~)렇게 쓰는 것이 문법}
    newMessage: {
      subscribe: (_, args, { prisma }) => {
        const { roomId } = args;
        // // 프리즈마 playground의 DOCS에서 MessageSubscriptionPayload를 참고(mutation, node)
        // 1) 구독한 메시지가(채팅방의 메시지가)
        return (
          //prisma의 $subscribe에서
          prisma.$subscribe
            //message(...):MessageSubscriptionPayload를 사용
            .message({
              AND: [
                // 3) 작성되었을 시
                //mutation : MutationType!
                { mutation_in: "CREATED" },
                {
                  // 2) 선택한 채팅방에서
                  //node : Message
                  node: {
                    room: { id: roomId }
                  }
                }
              ]
            })

            // MessageSubscriptionPayload에서 리턴하는 것은 mutation, node 등이 있는데
            //그 중에 node(message)를 리턴
            .node()
        );
      },
      //
      //서버가 푸시를 보낼 때, 어떤 데이터들을 담아서 보낼지에 대해서 이야기할 때 쓰는 용어라서다.
      //resolve함수는 promise의 then함수라고 생각하면 됨(payload는 data)
      resolve: payload => payload
    }
  }
};
