import express from 'express';
import * as controller from '../controller/usersController.js';

const router = express.Router();

router.get("/", controller.getUsers);    
router.post("/login", controller.getLogin);

export default router;