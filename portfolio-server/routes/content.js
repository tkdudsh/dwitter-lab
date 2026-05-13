import express from 'express';
import * as controller from '../controller/content.js';

const router = express.Router();

router.get('/work/project/:pid', controller.getProject);
router.get('/testimonials', controller.getTestimonials);
router.get('/work', controller.getWork);
router.get('/skills', controller.getSkills);
router.get('/about', controller.getAbout);
router.get('/home', controller.getHome);

export default router;