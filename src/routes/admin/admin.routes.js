import { Router } from "express";
import adminController from "../../controller/admin.controller.js";

const router = Router();

router.post('/register', adminController.register);
router.get('/login', adminController.login)

export default router;