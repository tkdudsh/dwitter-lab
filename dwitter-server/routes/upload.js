import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Multer 설정 ──────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('이미지 파일만 업로드 가능합니다. (jpeg, png, gif, webp)'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ── POST /upload ──────────────────────────────────────
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '파일이 없습니다.' });
  }
  res.json({
    message: '업로드 성공',
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

// ── Multer 에러 핸들러 ────────────────────────────────
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: '파일 크기는 5MB 이하여야 합니다.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

export default router;