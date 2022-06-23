import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import {
    deleteController,
    getAllController,
    getController,
    patchController,
    postController,
} from './task.controller';

describe('Given a function', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let taskModel: TaskModel;
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {},
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
        taskModel = new TaskModel();
    });
    describe('When we call getAllController', () => {
        test('Then the resp.end should be called', async () => {
            taskModel.findAll = jest.fn();
            await getAllController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });

    describe('When we call getController', () => {
        test('Then the resp.end should be called', async () => {
            let mockResult = {
                id: 2,
                title: 'test',
                responsible: 'testResponsible',
                isCompleted: false,
            };
            taskModel.find = jest.fn().mockResolvedValue(mockResult.id);
            await getController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call getController with a wrong id', () => {
        test('Then the resp.end should be called with a 404', async () => {
            taskModel.find = jest.fn().mockResolvedValue(null);
            await getController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalled();
        });
    });
    describe('When we call postController', () => {
        test('Then the resp.end should be called', async () => {
            taskModel.create = jest.fn();
            await postController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call patchController', () => {
        test('Then the resp.end should be called', async () => {
            taskModel.update = jest.fn();
            await patchController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call deleteController', () => {
        test('Then the resp.end should be called', async () => {
            taskModel.delete = jest.fn();
            await deleteController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
});
