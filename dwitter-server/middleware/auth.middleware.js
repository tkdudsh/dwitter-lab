import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dwitter_secret';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  //토큰 재생성시!!
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? '토큰이 만료되었습니다.'
      : '유효하지 않은 토큰입니다.';
    res.status(401).json({ message });
  }
}
