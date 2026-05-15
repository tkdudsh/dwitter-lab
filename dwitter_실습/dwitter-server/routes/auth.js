import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import * as controller from '../controller/auth.js';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'dwitter_secret';

// 회원가입 : /api/auth/register
router.post('/register', controller.getAuth);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, profileImage: user.avatar_url } });
  } catch {
    res.status(500).json({ message: '서버 오류' });
  }
});

export default router;