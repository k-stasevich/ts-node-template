import express from 'express';
import { authMiddleware, schemaValidator } from '../../middlewares';
import controller from './controller';
import schema from './schema';

const router = express.Router();

router.get('/', authMiddleware, schemaValidator(schema.getUsers), controller.getUsers);
router.get('/:id', authMiddleware, schemaValidator(schema.getUser), controller.getUser);
router.post('/', schemaValidator(schema.createUser), controller.createUser);

export default router;
