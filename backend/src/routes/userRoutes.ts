import express from 'express';
import { deleteUserController } from '../controllers/userController';
import { validateToken } from '../middlewares/validateToken';
import { validateBodyParams } from '../middlewares/validateBodyParams';
import { verifyPassword } from '../middlewares/verifyPassword';

const router = express.Router();

router.delete('/user/delete',
	validateBodyParams(['password']),
	validateToken,
	verifyPassword,
	deleteUserController);

export default router;