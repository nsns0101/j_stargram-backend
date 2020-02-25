# j_stargram

- instargram with Express + Prisma + React and React Native

## Prisma

- 참고
  - https://www.prisma.io/docs/datamodel-and-migrations/datamodel-MYSQL-knul/
- ORM(Object Relational Mapping)

* 필요한 모델을 graphql로 정의할 수 있음

* 로그인 및 DB생성
  - Prisma 홈페이지 참고
  - .gitignore에 생성된 generated를 추가
* 모델 생성
  - datamodel.prisma에서 설정하고 명령창에서 prisma deploy하면 됨

### yarn add list

- yarn add graphql-yoga
- yarn add nodemon -D
- yarn dotenv
  - env 파일을 읽음
- yarn add @babel/node
- yarn add @babel/preset-env
- yarn add @babel/core
- yarn add morgan
  - 로깅 전용 모듈
- yarn add graphql-tools merge-graphql-schemas
  - 스키마들을 통합해서 한번에 import할 수 있게 만들어 줌
- yarn add prisma
  - prisma cli설치
- yarn add prisma-client-lib
