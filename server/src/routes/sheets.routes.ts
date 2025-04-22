import { Router } from 'express';
import { connectSheet } from '../controllers/sheets.controller';

const router = Router();

router.post('/connect', connectSheet);

export default router;
