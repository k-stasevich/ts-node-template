import express from 'express';
import { authMiddleware } from '../../middlewares';
import controller from './controller';

const router = express.Router();

router.get('/', authMiddleware, controller.getUsers);

export default router;
