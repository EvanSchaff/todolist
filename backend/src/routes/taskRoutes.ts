import express from 'express';
import { createTaskController, updateTaskController, deleteTaskController, toggleTaskCompletionController, getTasksController } from '../controllers/taskController';
import { validateParams } from '../middlewares/validateParams';
import { validateBodyParams } from '../middlewares/validateBodyParams';
import { validateToken } from '../middlewares/validateToken';
import { validateDate } from '../middlewares/validateDueDate';
import { checkListExists } from '../middlewares/checkListExists';
import { checkTaskExists } from '../middlewares/checkTaskExists';

const router = express.Router();

router.post('/users/:userId/lists/:listId/tasks',
	validateParams(['userId', 'listId']),
	validateBodyParams(['task']),
	validateDate,
	validateToken,
	createTaskController);
router.get('/users/:userId/lists/:listId/tasks',
	validateParams(['userId', 'listId']),
	validateToken,
	checkListExists,
	getTasksController);
router.put('/users/:userId/lists/:listId/tasks/:taskId',
	validateParams(['userId', 'listId', 'taskId' ]),
	validateBodyParams(['task']),
	validateToken,
	checkTaskExists,
	updateTaskController);
router.delete('/users/:userId/lists/:listId/tasks/:taskId',
	validateParams(['userId', 'listId', 'taskId' ]),
	validateToken,
	checkTaskExists,
	deleteTaskController);
router.patch('/users/:userId/lists/:listId/tasks/:taskId/complete',
	validateParams(['userId', 'listId', 'taskId' ]),
	validateToken,
	checkTaskExists,
	toggleTaskCompletionController);

export default router;
