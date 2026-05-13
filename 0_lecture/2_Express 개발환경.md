## 1. Express 개발환경

#### (1) Express 패키지 설치

1️⃣ 서버 폴더 생성

```
    예) mkdir server
```

2️⃣ 폴더 초기화

```
    예) cd server
        npm init --yes
```

3️⃣ express 설치

```
    예) npm i express
        npm i nodemon -save-dev
```

4️⃣ package.json 확인

- type을 module로 수정
- scripts에 "start": "nodemon app" 추가

```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

5️⃣ App.js 실행 파일 생성

```
//1. 라이브러리 임포트
import express from 'express';
import cors from 'cors';

//2. 익스프레스 서버 객체 생성
const PORT = 9000;
const app = express();

//3. 미들웨어
app.use(cors());   //모든 origin(프론트) 허용
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//4. 라우팅
app.get('/', (req, res, next)=>{
    res.send('response -> server.js');
});


//5. 익스프레스 서버 객체 실행
app.listen(PORT, () => {
    console.log(`서버 실행 --->> ${PORT}`);
});

```

6️⃣ 서버 실행

```
  npm run start
```

<br><br>

## 2. React 개발환경

#### (1) vite 프로젝트 생성

```
  npm create vite@latest front
```

#### (2) vite 프로젝트 실행

```
  cd front
  npm install
  npm run dev
```
