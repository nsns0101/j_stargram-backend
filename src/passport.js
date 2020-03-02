//PASSPORT
import { prisma } from "../generated/prisma-client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import "./env"; //env.js

const jwtOptions = {
  //fromAuthHeaderAsBearerToken : Authorization헤더에서 jwt를 찾는 역할
  // {Authorization: 'Bearer TOKEN'}
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //토큰을 암호화하기 위한 문자열(env참고(토큰값은 임의로 줬음))
  secretOrKey: process.env.JWT_SECRET
};

//https://github.com/mikenicholson/passport-jwt
//done은 사용자를 찾았을 때 호출해야하는 함수
export const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      //done의 첫번째 인자는 error의 유무, 두번째는 값
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

//passport는 쿠키를 만들어줌
export const authenticateJwt = (req, res, next) => {
  return passport.authenticate(
    "jwt",
    //passport에는 어떤 것도 입력되지 않기 위해 session:false를 줌
    { session: false },
    //appendUser(verfyUser에서 사용자를 받아온 후)
    (error, user) => {
      //사용자가 존재하면
      if (user) {
        //그 사용자 정보를 req객체에 대입함
        req.user = user; //즉, 로그인이 되어있다면 모든 graphql요청에 사용자 정보가 추가되어서 요청됨
      }
      next(); //express에서는 미들웨어를 지나 라우터가 실행됨
    }
  )(req, res, next); //next해야 다음 미들웨어로 넘어감
};
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
