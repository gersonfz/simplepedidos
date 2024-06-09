import { Router } from 'express';
import adminRouter from './admin/admin.routes.js';

const router = Router();

router.use('/admin', adminRouter);

export default router;