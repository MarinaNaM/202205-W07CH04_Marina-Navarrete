import { Router } from 'express';
import {
    deleteController,
    getAllController,
    getController,
    patchController,
    postController,
} from '../controllers/task.controller.js';

export const taskRouter = Router();

taskRouter.get('/', getAllController);

taskRouter.get('/:id', getController);
taskRouter.post('/', postController);

taskRouter.patch('/:id', patchController);

taskRouter.delete('/:id', deleteController);
