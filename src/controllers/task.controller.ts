import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model.js';

const taskModel = new TaskModel();

export const getAllController = async (req: Request, resp: Response) => {
    req;
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(await taskModel.findAll()));
};

export const getController = async (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const result = await taskModel.find(req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    const newTask = await taskModel.create(req.body);
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newTask));
};

export const patchController = async (req: Request, resp: Response) => {
    const updateTask = await taskModel.update(req.params.id, req.body);
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(updateTask));
};

export const deleteController = async (req: Request, resp: Response) => {
    const { status } = await taskModel.delete(req.params.id);
    resp.status(status);
    resp.end(JSON.stringify({}));
};
