import express from 'express';
import pool from '../db.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

const TWEET_SELECT = `
  SELECT
    t.id,
    t.content,
    t.created_at,
    u.id       AS user_id,
    u.username,
    u.avatar_url
  FROM tweets t
  JOIN users u ON t.user_id = u.id
`;

/**
 * GET /api/tweets
 * 전체 트윗 (최신순)
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`${TWEET_SELECT} ORDER BY t.created_at DESC`);
    res.json(rows);
  } catch (err) {
    console.error('[GET /tweets]', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

/**
 * GET /api/tweets/my
 * 내 트윗 (인증 필요)
 */
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `${TWEET_SELECT} WHERE t.user_id = ? ORDER BY t.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error('[GET /tweets/my]', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

/**
 * POST /api/tweets
 * 트윗 작성 (인증 필요)
 */
router.post('/', authMiddleware, async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) {
    return res.status(400).json({ message: '내용을 입력하세요.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tweets (user_id, content) VALUES (?, ?)',
      [req.user.id, content.trim()]
    );
    const [rows] = await pool.query(
      `${TWEET_SELECT} WHERE t.id = ?`,
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('[POST /tweets]', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

/**
 * PUT /api/tweets/:id
 * 트윗 수정 (인증 + 본인만)
 */
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    return res.status(400).json({ message: '내용을 입력하세요.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM tweets WHERE id = ?', [id]);
    if (!rows.length)        return res.status(404).json({ message: '트윗을 찾을 수 없습니다.' });
    if (rows[0].user_id !== req.user.id)
      return res.status(403).json({ message: '수정 권한이 없습니다.' });

    await pool.query('UPDATE tweets SET content = ? WHERE id = ?', [content.trim(), id]);
    res.json({ message: '수정되었습니다.' });
  } catch (err) {
    console.error('[PUT /tweets/:id]', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

/**
 * DELETE /api/tweets/:id
 * 트윗 삭제 (인증 + 본인만)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM tweets WHERE id = ?', [id]);
    if (!rows.length)        return res.status(404).json({ message: '트윗을 찾을 수 없습니다.' });
    if (rows[0].user_id !== req.user.id)
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });

    await pool.query('DELETE FROM tweets WHERE id = ?', [id]);
    res.json({ message: '삭제되었습니다.' });
  } catch (err) {
    console.error('[DELETE /tweets/:id]', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

export default router;
