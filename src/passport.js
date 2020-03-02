//PASSPORT
import { prisma } from "../generated/prisma-client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const jwtOptions = {
  //fromAuthHeaderAsBearerToken : Authorization헤더에서 jwt를 찾는 역할
  // {Authorization: 'Bearer TOKEN'}
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //토큰을 암호화하기 위한 문자열(env참고(토큰값은 임의로 줬음))
  secretOrKey: process.env.JWT_SECRET
};

//https://github.com/mikenicholson/passport-jwt
//done은 사용자를 찾았을 때 호출해야하는 함수
const verifyUser = async (payload, done) => {
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
passport.use(new Strategy(jwtOptions, verifyUser));
