import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host:             process.env.DB_HOST     || 'localhost',
    user:             process.env.DB_USER     || 'root',
    password:         process.env.DB_PASSWORD || '',
    database:         process.env.DB_NAME     || 'dwitter',
    waitForConnections: true,
    connectionLimit:  10,
    timezone:         '+09:00',
});

// 연결 테스트
pool.getConnection()
.then(conn => { console.log('✅ MySQL 연결 성공'); conn.release(); })
.catch(err => console.error('❌ MySQL 연결 실패:', err.message));

export default pool;
