//비밀값만들기 + 이메일 보내는 포맷 + 토큰생성
import "./env"; //env.js
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
// import mailgun_Transport from "nodemailer-mailgun-transport";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken"; //json web token

//비밀값 만들기
export const generateSecret = () => {
  //Math.floor은 내림함수
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// https://github.com/orliesaurus/nodemailer-mailgun-transport/blob/master/README.mdconst
const sendMail = async email => {
  const options = {
    auth: {
      // api_key: process.env.MAILGUN_API_KEY,
      // domain: process.env.MAILGUN_API_DOMAIN
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  // const client = nodemailer.createTransport(mailgun_Transport(options));
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

//sendSecretMail함수 호출은 server.js에서함
//adress는 받는사람 주소, secret는 암호(암호를 입력해야 로그인이 가능하게)
export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "as14512003@gmail.com", //보내는사람
    to: adress, //받는사람
    subject: "🔒Login Secret for j_stargram🔒", //메일 제목
    html: `Hello! Your login secret is <b>${secret}</b>. <br/>Copy paste on the app/website to login` //메일 내용
  };
  return sendMail(email);
};

//토큰생성
// https://github.com/auth0/node-jsonwebtoken
export const generateToken = id => {
  //jwt가 id를 암호화하면서 토큰을 생성함
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
