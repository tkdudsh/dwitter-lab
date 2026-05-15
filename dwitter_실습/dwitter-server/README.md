# dwitter-server

Dwitter REST API — Express + MySQL

## 시작하기

```bash
# 1. 패키지 설치
npm install

# 2. 환경변수 설정
cp .env.example .env
# .env 에서 DB_PASSWORD, JWT_SECRET 수정

# 3. DB 초기화 (최초 1회)
mysql -u root -p < schema.sql

# 4. 개발 서버 실행
npm run dev        # nodemon (자동 재시작)
npm start          # 일반 실행
```

서버: http://localhost:3001

---

## API 엔드포인트

### 인증
| Method | URL                  | 인증 | 설명       |
|--------|----------------------|------|----------|
| POST   | /api/auth/register   | ❌   | 회원가입  |
| POST   | /api/auth/login      | ❌   | 로그인    |

### 트윗
| Method | URL                  | 인증 | 설명          |
|--------|----------------------|------|-------------|
| GET    | /api/tweets          | ❌   | 전체 트윗 조회 |
| GET    | /api/tweets/my       | ✅   | 내 트윗 조회  |
| POST   | /api/tweets          | ✅   | 트윗 작성     |
| PUT    | /api/tweets/:id      | ✅   | 트윗 수정     |
| DELETE | /api/tweets/:id      | ✅   | 트윗 삭제     |

### 기타
| Method | URL      | 설명        |
|--------|----------|-----------|
| GET    | /health  | 헬스체크    |

---

## 인증 방식
JWT Bearer Token — 요청 헤더에 포함:
```
Authorization: Bearer <token>
```

## 샘플 계정
| 아이디 | 비밀번호     |
|--------|------------|
| user1  | password123 |
| user2  | password123 |
| user3  | password123 |

## 폴더 구조
```
dwitter-server/
├── index.js              # 서버 진입점
├── db.js                 # MySQL 연결 풀
├── schema.sql            # DB 스키마 + 샘플 데이터
├── .env.example          # 환경변수 예시
├── middleware/
│   └── auth.js           # JWT 인증 미들웨어
└── routes/
    ├── auth.js           # 로그인 / 회원가입
    └── tweets.js         # 트윗 CRUD
```
