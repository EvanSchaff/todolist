import { Request, Response } from 'express';
import { createTask, getTasks, updateTask, deleteTask, toggleTaskCompletion } from '../models/taskModels';

export async function createTaskController(req: Request, res: Response) {

	try {
		const { listId } = req.params;
		const { task, dueDate } = req.body;

		const newTask = await createTask(listId, task, dueDate || null);

		res.status(201).json({
			success: true,
			message: 'Task successfully created',
			data: newTask,
		});
	}
	catch (err) {
		console.error('Error in createTaskController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during task creation',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

export async function getTasksController(req: Request, res: Response) {
	try {
		const { listId } = req.params;

		const tasks = await getTasks(listId);
		res.status(200).json({
			success: true,
			message: 'Tasks retrieved successfully',
			data: tasks,
		});
	}
	catch (err) {
		console.error('Error in getTasksController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error getting tasks',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

export async function updateTaskController(req: Request, res: Response) {
	try {
		const { taskId } = req.params;
		const { task, dueDate } = req.body;
		const currentTask = req.targetTask;

		if (task === undefined && dueDate === undefined) {
			return res.status(400).json({
				success: false,
				message: 'At least one field (task or dueDate) must be provided',
			});
		}

		const updatedTask = await updateTask(
			taskId,
			task !== undefined ? task : currentTask.task,
			dueDate !== undefined ? dueDate : currentTask.due_date,
		);
		res.status(200).json({
			success: true,
			message: 'Task updated successfully',
			data: updatedTask,
		});
	}
	catch (err) {
		console.error('Error in updateTaskController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error updating task',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

export async function deleteTaskController(req: Request, res: Response) {
	try {
		const { taskId } = req.params;

		await deleteTask(taskId);
		res.status(200).json({
			success: true,
			message: 'Task deleted successfully',
			data: {
				task_id: taskId,
			},
		});
	}
	catch (err) {
		console.error('Error in deleteTaskController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error deleting task',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

export async function toggleTaskCompletionController(req: Request, res: Response) {
	try {
		const { taskId } = req.params;

		const toggledTask = await toggleTaskCompletion(taskId);
		res.status(200).json({
			success: true,
			message: 'Task completion state toggled',
			data: toggledTask,
		});
	}
	catch (err) {
		console.error('Error in toggleTaskCompletionController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error toggling task completion',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}
