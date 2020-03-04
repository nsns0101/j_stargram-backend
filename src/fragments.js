//프래그먼트 생성
export const USER_FRAGMENT = `
    fragment UserParts on User{
        id
        username
        email
        firstName
        lastName
        bio
        posts {
            id
            caption
        }
    }
`;
