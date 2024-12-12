import express from 'express';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/authController';
import { validateBodyParams } from '../middlewares/validateBodyParams';
import { validateRegistrationCredentials } from '../middlewares/validateRegistrationCredentials';
import { verifyPassword } from '../middlewares/verifyPassword';
import { validateToken } from '../middlewares/validateToken';
import { checkUserExists } from '../middlewares/checkUserExists';

const router = express.Router();

router.post('/register',
	validateBodyParams(['username', 'password']),
	validateRegistrationCredentials,
	registerUserController);
router.post('/login',
	validateBodyParams(['username', 'password']),
	checkUserExists,
	verifyPassword,
	loginUserController);
router.post('/logout',
	validateToken,
	logoutUserController);

export default router;