import { Router } from 'express';
import { getallLogger } from '../controllers/logger.controller.js';

const router = Router();

router.get('/', getallLogger);

export default router;