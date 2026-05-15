import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import * as controller from '../controller/auth.js';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'dwitter_secret';

// 회원가입 : /api/auth/register
router.post('/register', controller.getAuth);

// 로그인 : /api/auth/login
router.post('/login', controller.getLogin);

export default router;