import { Request, Response } from 'express';
import { createList, deleteList, getListById, getLists, updateList } from '../models/listModels';

export async function createListController(req: Request, res: Response) {
	try {
		const { title } = req.body;
		const user = req.token;

		const response = await createList(user.id, title);

		res.status(200).json({
			success: true,
			message: 'List successfully created',
			data: {
				list_id: response.list_id,
				title: response.title,
			},
		});
	}
	catch (err) {
		console.error('Error in createListController:', err);
		res.status(500).json({ error: 'Internal server error during list creation' });
	}
}


export async function getListsController(req: Request, res: Response) {
	try {
		const user = req.token;

		const lists = await getLists(user.id);
		res.status(200).json({
			success: true,
			message: 'Lists retrieved successfully',
			data: lists,
		});
	}
	catch (err) {
		console.error('Error in getListsController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error during list creation',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}


export async function updateListController(req: Request, res: Response) {
	try {
		const { listId } = req.params;
		const { title } = req.body;

		const currentList = await getListById(listId);
		if (!currentList) {
			return res.status(404).json({
				success: false,
				message: 'List not found or does not belong to the user',
			});
		}

		if (currentList.title === title) {
			return res.status(200).json({
				success: true,
				message: 'No changes were made',
				data: {
					list_id: listId,
					title: currentList.title,
				},
			});
		}

		const updatedList = await updateList(listId, title);

		res.status(200).json({
			success: true,
			message: 'List renamed successfully',
			data: {
				list_id: updatedList.list_id,
				title: updatedList.title,
			},
		});
	}
	catch (err) {
		console.error('Error in updateListController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error updating list',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

export async function deleteListController(req: Request, res: Response) {
	try {
		const { listId } = req.params;

		await deleteList(listId);

		res.status(200).json({
			success: true,
			message: 'List deleted successfully',
			data: {
				list_id: listId,
			},
		});
	}
	catch (err) {
		console.error('Error in deleteListController:', err);
		res.status(500).json({
			success: false,
			message: 'Internal server error deleting list',
			error: err instanceof Error ? err.message : 'Unknown error',
		});
	}
}

