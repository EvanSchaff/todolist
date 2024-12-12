import express from 'express';
import { createListController, getListsController, updateListController, deleteListController } from '../controllers/listController';
import { validateBodyParams } from '../middlewares/validateBodyParams';
import { validateToken } from '../middlewares/validateToken';
import { validateParams } from '../middlewares/validateParams';
import { checkListExists } from '../middlewares/checkListExists';

const router = express.Router();

router.post('/users/:userId/lists',
	validateParams(['userId']),
	validateBodyParams(['title']),
	validateToken,
	createListController);
router.get('/users/:userId/lists',
	validateParams(['userId']),
	validateToken,
	getListsController);
router.put('/users/:userId/lists/:listId',
	validateParams(['userId', 'listId']),
	validateBodyParams(['title']),
	validateToken,
	updateListController);
router.delete('/users/:userId/lists/:listId',
	validateParams(['userId', 'listId']),
	validateToken,
	checkListExists,
	deleteListController);

export default router;
