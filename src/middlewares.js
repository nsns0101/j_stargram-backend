export const isAuthenticated = request => {
  //로그아웃 상태면
  //localhost:4000으로 테스트할 때 하단에
  //HTTP HEADERS에 토큰이 있는지를 확인할 것
  if (!request.user) {
    throw Error("이 작업을 하려면 로그인이 필요합니다.");
  }
  return;
};
