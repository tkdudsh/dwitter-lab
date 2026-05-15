# 📚 포트폴리오 서버 아키텍처 가이드 (초보자용)

포트폴리오 서버의 구조를 단계별로 설명합니다.

---

## 🎯 1. 전체 흐름 (클라이언트 → 서버 → DB)

```
프런트엔드 (React)
      ↓
    API 요청 (예: /content/home)
      ↓
   Express 라우터 (routes/)
      ↓
   컨트롤러 (controller/) → 비즈니스 로직
      ↓
   리포지토리 (repository/) → DB 쿼리 만들기
      ↓
   DB 커넥션 (db/connection.js) → MySQL 실행
      ↓
   데이터베이스 (MySQL)
      ↓
   JSON 응답으로 프런트엔드에 전달
```

---

## 📂 2. 각 폴더 역할 설명

### 📌 **app.js** (서버의 진입점)
```javascript
// 서버를 시작하는 곳입니다!
// 마치 카페 오픈하기 전 설정하는 것처럼
```
**역할:**
- Express 앱 생성
- CORS 설정 (프런트엔드에서 데이터를 받을 수 있도록 허락)
- JSON 형식으로 데이터 받기 설정
- 라우터 연결 (어떤 URL 요청이 어디로 갈지 정하기)
- 서버 실행 (포트 9000에서 대기)

**비유:** 카페의 "지점장"처럼 모든 손님(요청)을 올바른 직원에게 배치하는 역할

---

## 🔌 3. .env 파일 (비밀번호 파일)

```env
DB_HOST=localhost          # DB가 설치된 컴퓨터 주소
DB_USER=root               # DB 접속 아이디
DB_PASSWORD=tk4dud0sh!     # DB 접속 비밀번호
DB_NAME=hrdb2019           # 사용할 데이터베이스 이름
```

**왜 필요할까?**
- 데이터베이스에 접속하기 위한 "열쇠"들을 저장합니다
- `.env` 파일은 **GitHub에 올리지 않습니다** (비밀번호가 노출될 수 있으니까!)
- `.gitignore`에 `.env` 추가해서 깃에서 무시하도록 설정

**비유:** 집의 열쇠를 따로 보관하듯이, DB 비밀번호도 별도의 파일에 보관

---

## 🗂️ 4. db/connection.js (데이터베이스 연결)

```javascript
// DB에 연결하는 방법을 정의
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
dotenv.config();  // .env 파일에서 설정값 읽어오기

const db = mysql.createPool({
    host: process.env.DB_HOST,      // .env에서 읽은 값
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
```

**역할:**
- MySQL과 연결하기 위한 "풀(Pool)" 생성
- `.env` 파일에서 비밀번호 등을 읽어서 사용
- 다른 파일에서 `import db from '../db/connection.js'`로 사용

**"풀(Pool)"이란?**
- 여러 사람이 동시에 DB에 접근할 수 있도록 미리 여러 개의 연결을 준비해두는 것
- 마치 은행의 창구처럼 여러 고객을 동시에 처리할 수 있게하는 것

---

## 📝 5. repository/content.js (DB 쿼리 함수들)

```javascript
// 실제 SQL 쿼리를 실행하는 곳
import db from '../db/connection.js'

export const getHome = async () => {
    const sql = `select home from portfolio`;  // SQL 쿼리
    const [results] = await db.execute(sql, []);  // DB에서 실행
    return results[0].home;  // 결과 반환
}
```

**역할:**
- **Data Access Layer** (데이터 접근 계층)
- SQL 쿼리를 만들고 실행하는 함수들
- DB에서 가져온 데이터를 정제해서 반환

**특징:**
- `async/await` 사용 (DB 작업 완료될 때까지 기다리기)
- `db.execute()` → 쿼리를 DB에 보내고 결과 받기
- `[results]` → 배열 구조 분해 (첫 번째 요소만 받기)

**비유:** 창고 직원처럼 "홈 섹션 데이터 가져와!" 하는 일을 합니다

---

## 🎮 6. controller/content.js (컨트롤러)

```javascript
// 비즈니스 로직을 처리하는 곳
import * as repository from '../repository/content.js';

export const getHome = async (req, res, next) => {
    const home = await repository.getHome();  // 리포지토리 함수 호출
    res.json({"result": home});  // JSON으로 응답
}
```

**역할:**
- **Business Logic Layer** (비즈니스 로직 계층)
- 요청(req)을 받아서 처리하고 응답(res) 보내기
- Repository 함수를 호출해서 데이터 가져오기
- 데이터 검증, 가공 등의 로직 처리

**구조:**
```
export const 함수명 = async (req, res, next) => {
    // req: 클라이언트에서 보낸 요청 정보
    // res: 클라이언트에게 응답하는 객체
    // next: 다음 미들웨어로 넘기기 (지금은 안 씀)
}
```

**비유:** 식당의 "홀 서빙" 직원처럼 손님의 주문을 받아서 주방에 전달하고, 음식을 가져와 손님에게 제공합니다

---

## 🛣️ 7. routes/content.js (라우터)

```javascript
// URL 경로와 컨트롤러 함수를 연결하는 곳
import express from 'express';
import * as contentController from '../controller/content.js';

const router = express.Router();

router.get('/home', contentController.getHome);
router.get('/about', contentController.getAbout);
router.get('/skills', contentController.getSkills);
// ...
```

**역할:**
- URL 요청을 올바른 컨트롤러 함수로 보내기

**예시:**
- `GET /content/home` 요청 → `contentController.getHome()` 호출
- `GET /content/about` 요청 → `contentController.getAbout()` 호출

**비유:** 카페의 "안내판"처럼 손님을 올바른 자리로 안내합니다

---

## 💻 8. package.json (프로젝트 설정 파일)

```json
{
  "name": "portfolio-server",
  "type": "module",          // ES6 모듈 사용 (import/export)
  "scripts": {
    "start": "nodemon app"   // npm start로 서버 실행
  },
  "dependencies": {
    "express": "^5.2.1",     // 웹 프레임워크
    "cors": "^2.8.6",        // CORS 설정 (프런트엔드 연결)
    "dotenv": "^17.4.2",     // .env 파일 읽기
    "mysql2": "^3.22.3"      // MySQL 드라이버
  }
}
```

---

## 🔄 9. 실제 요청 흐름 예시

사용자가 프런트엔드에서 "Home 데이터 주세요!"라고 요청할 때:

```
1️⃣ 프런트엔드에서 요청
   fetch('http://localhost:9000/content/home')

2️⃣ app.js에서 받음
   '/content' 경로 → contentRouter로 보냄

3️⃣ routes/content.js에서 라우팅
   GET /home → contentController.getHome() 호출

4️⃣ controller/content.js에서 비즈니스 로직
   repository.getHome() 호출

5️⃣ repository/content.js에서 DB 쿼리 작성
   SELECT home FROM portfolio 쿼리 실행

6️⃣ db/connection.js에서 DB 연결
   .env의 정보로 MySQL 접속
   쿼리 실행

7️⃣ MySQL DB에서 데이터 조회
   portfolio 테이블의 home 컬럼 데이터 반환

8️⃣ 역순으로 데이터 전달
   repository → controller → routes → app → 프런트엔드

9️⃣ 프런트엔드에서 받은 데이터
   {"result": "home 데이터..."}
```

---

## 🎓 10. 핵심 개념 정리

| 파일/폴더 | 역할 | 비유 |
|-----------|------|------|
| **app.js** | 서버 전체 설정 | 카페 지점장 |
| **.env** | DB 연결 비밀번호 | 집의 열쇠 |
| **db/connection.js** | DB 연결 방법 | 은행 창구 시스템 |
| **repository/** | SQL 쿼리 실행 | 창고 직원 |
| **controller/** | 비즈니스 로직 | 홀 서빙 직원 |
| **routes/** | URL 경로 설정 | 카페 안내판 |

---

## 🚀 11. 명령어

```bash
# 서버 시작 (nodemon으로 자동 재시작)
npm start

# 혹은
npm run start
```

nodemon이 설치되어 있어서 파일 수정하면 자동으로 서버가 다시 시작됩니다!

---

**이제 이 구조를 이해했다면, 새로운 기능을 추가할 때 어디에 코드를 작성해야 할지 알 수 있습니다! 🎉**
