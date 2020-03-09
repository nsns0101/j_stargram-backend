//computed.js 또한 하나의 resolver라서 resolver를 종합할 때 같이 종합됨
export default {
  //유저-------------------------------------------------------------------------------------------------------------------
  User: {
    posts: ({ id, prisma }) => prisma.user({ id }).posts(), //해당 유저의 게시글 정보
    following: ({ id, prisma }) => prisma.user({ id }).following(), //해당 유저의 팔로잉 정보
    followers: ({ id, prisma }) => prisma.user({ id }).followers(), //해당 유저의 팔로워 정보
    likes: ({ id, prisma }) => prisma.user({ id }).likes(), //해당 유저의 좋아요 정보
    comments: ({ id, prisma }) => prisma.user({ id }).comments(), //해당 유저의 댓글 정보
    rooms: ({ id, prisma }) => prisma.user({ id }).rooms(), //해당 유저의 채팅방 정보

    //해당 유저가 팔로우하고 있는 인원 수
    followingCount: ({ id, prisma }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate() //자료를 범주별로 나누어서 각 범주에 대한 통계량을 구해준다.
        .count(),

    //해당 유저의 팔로워 수
    followersCount: ({ id, prisma }) =>
      prisma
        .usersConnection({ where: { following_none: { id } } })
        .aggregate() //자료를 범주별로 나누어서 각 범주에 대한 통계량을 구해준다.
        .count(),

    //fullName
    //parent는 상위 resolver가 return한 값을 그대로 가져오는 것인가?
    fullName: parent => {
      //   console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },

    //isFollowing
    //내가 이 사람을 팔로우하고 있는지를 나타냄
    isFollowing: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;
      console.log(user.id);
      console.log(parentId);
      try {
        //조건의 유저가 있는지 검색
        //있으면 true 없으면 false를 반환
        return prisma.$exists.user({
          AND: [
            { id: user.id }, //id가 현재 로그인한 유저이고
            { following_some: { id: parentId } } //내 팔로잉에 parentId가 있는지
          ]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    //isSelf
    //현재 보고있는 것이 내 프로필인지?
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  } //유저끝 --------------------------------------------------------------------------------------------------------------------
};

//parent란 자기를 감싸고 있는 부모?
// {
//   seeUserProfile(id:"ck7bvl9v91w670984s9f7criz"){
//      user{
//          fullName
//      }
//   }
// }
// => user의 부모는 seeUserProfile이니까 fullName은 id가 "ck7bvl9v91w670984s9f7criz"인 유저의 fullName을 보여줌
