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
    }
`;
