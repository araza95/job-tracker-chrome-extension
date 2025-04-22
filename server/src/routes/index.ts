import { Router } from 'express';
import sheetsRoutes from './sheets.routes';

const router = Router();

router.use('/sheets', sheetsRoutes);

export default router;
