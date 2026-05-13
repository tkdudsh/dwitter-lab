import express from 'express';
import * as controller from '../controller/footer.js';

const router = express.Router();

router.get('/', controller.getFooter);

export default router;