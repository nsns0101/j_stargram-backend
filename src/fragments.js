//프래그먼트를 토대로 검색하면 될듯

//유저 정보
export const USER_FRAGMENT = `
        id
        avatar
        username
`;

//댓글 정보
export const COMMENT_FRAGMENT = `
        id
        text
        user{
            ${USER_FRAGMENT}
        }
`;

//파일 정보
export const FILE_FRAGMENT = `
        id
        url
`;

//메시지 정보
export const MeSSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;

//게시글 프래그먼트
export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        location
        caption
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }

    }
`;

// 룸 프래그먼트
export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages{
            ${MeSSAGE_FRAGMENT}
        }
    }
`;
