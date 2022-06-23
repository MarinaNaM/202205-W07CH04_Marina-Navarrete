/* eslint-disable no-unused-vars */
import { mongoConnect } from '../db/mongo.js';
import { TaskModel } from '../models/task.model.js';

jest.mock('../db/mongo.js');

describe('Given a instantiated model TaskModel', () => {
    let model: TaskModel;
    // let result: string;
    let mockItem = { id: 1, test: 'test' };
    const mockFind = jest.fn();
    const mockFindOne = jest.fn();
    const mockCreate = jest.fn();
    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();
    const mockCloseConnection = jest.fn();

    beforeEach(() => {
        // result = JSON.stringify([mockItem]) as string;
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: mockCloseConnection },
            collection: {
                find: mockFind,
                findOne: mockFindOne,
                insertOne: mockCreate,
                findOneAndUpdate: mockUpdate,
                findOneAndDelete: mockDelete,
            },
        });
        model = new TaskModel();
    });

    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFind).toHaveBeenCalled();
            expect(mockCloseConnection).toHaveBeenCalled();
        });
    });

    describe('When method find is called', () => {
        test('Then an item should be found', async () => {
            mockFindOne.mockResolvedValue(mockItem);
            await model.find('62b4a4d245c0c4bdc0fbee23');
            expect(mockFindOne).toHaveBeenCalled();
        });
    });

    describe('When method find is called with an invalid id', () => {
        test('Then an item shouldnt be found', async () => {
            mockFindOne.mockResolvedValue(null);
            const result = await model.find('62b4a4d245c0c4bdc0fbee23');
            expect(mockFindOne).toHaveBeenCalled();
            expect(result).toBe(undefined);
        });
    });

    describe('When method create is called', () => {
        test('Then an item should be created', async () => {
            mockCreate.mockResolvedValue(mockItem);
            await model.create(mockItem);
            expect(mockCreate).toHaveBeenCalled();
        });
    });

    describe('When method update is called', () => {
        test('Then an item should be updated', async () => {
            mockUpdate.mockResolvedValue(mockItem);
            await model.update('62b4a4d245c0c4bdc0fbee23', mockItem);
            expect(mockUpdate).toHaveBeenCalled();
        });
    });

    describe('When method delete is called with a valid id', () => {
        test('Then an item should be  deleted', async () => {
            mockDelete.mockResolvedValue({
                value: true,
            });
            const result = await model.delete('62b4a4d245c0c4bdc0fbee23');
            expect(mockDelete).toHaveBeenCalled();
            expect(result.status).toBe(202);
        });
    });

    describe('When method delete is called with a not valid id', () => {
        test('Then an item should not be  deleted', async () => {
            mockDelete.mockResolvedValue({ value: null });
            const result = await model.delete('62b4a4d245c0c4bdc0fbee23');
            expect(mockDelete).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });
});
