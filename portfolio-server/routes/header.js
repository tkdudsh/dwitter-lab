import express from 'express';
// import { getHeader } from '../controller/header.js';
import * as controller from '../controller/header.js';

const router = express.Router();

router.get("/", controller.getHeader);

export default router;