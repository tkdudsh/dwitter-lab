import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import * as controller from '../controller/tweets.js';

const router = express.Router();

/**
 * GET /api/tweets
 * 전체 트윗 (최신순)
 */
router.get('/', controller.getAll);

/**
 * GET /api/tweets/my
 * 내 트윗 (인증 필요)
 * 반드시!! 로그인 인증이 완료된 후 실행됨
 */
router.get('/my', authMiddleware, controller.getMyTweets);

/**
 * POST /api/tweets
 * 트윗 작성 (인증 필요)
 */
router.post('/', authMiddleware, controller.createMyTweet);

/**
 * PUT /api/tweets/:id
 * 트윗 수정 (인증 + 본인만)
 */
router.put('/:id', authMiddleware, controller.getMyTweetsUpdate);

/**
 * DELETE /api/tweets/:id
 * 트윗 삭제 (인증 + 본인만)
 */
router.delete('/:id', authMiddleware, controller.getMyTweetsDelete);

export default router;
