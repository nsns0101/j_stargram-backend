//computed.js 또한 하나의 resolver라서 resolver를 종합할 때 같이 종합됨
export default {
  //유저-------------------------------------------------------------------------------------------------------------------
  User: {
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
  },
  //게시글-------------------------------------------------------------------------------------------------------------------
  Post: {
    //isLiked
    //내가 좋아요한 글인지?
    isLiked: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;
      //좋아요가 있는지를 판단
      return prisma.$exists.like({
        AND: [
          { user: { id: user.id } }, // 2) 내 id의 좋아요가 있는지
          { post: { id: parentId } } // 1) 현재 게시글에
        ]
      });
    }
  }
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
