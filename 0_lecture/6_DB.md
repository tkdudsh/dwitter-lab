## 1. DB 연동

### (1) 공식 사이트

- https://sidorares.github.io/node-mysql2/docs


### (2) 라이브러리 설치

- mysql2, dotenv

```
npm install express mysql2 dotenv

```


### (3) DB 연동 코드

1️⃣ .env

- 형식

```
DB_HOST=서버IP
DB_USER=계정
DB_PASSWORD=패스워드
DB_NAME=스키마(DB)명
PORT=포트번호
```


2️⃣ db/connection.js

```
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log('✅ DB Pool 생성 성공!');

export default db;
```

3️⃣ repository/header.js

```
import db from '../db/connection.js';

export const getHeader = async() => {
    const sql = ` select header from portfolio `;
    const [ result ] = await db.execute(sql, []);

    return await result[0].header;

}
```

4️⃣ controller/header.js

```
import * as repository from '../repository/header.js';

export const getHeader = async(req, res, next) => {
    const header = await repository.getHeader();
    res.json({"result": header});
}
```
