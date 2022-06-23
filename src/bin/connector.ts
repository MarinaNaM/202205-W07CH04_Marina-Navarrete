/* eslint-disable no-unused-vars */
import fs from 'fs/promises';
import { ObjectId } from 'mongodb';
import { mongoConnect } from '../db/mongo.js';
import { iTask } from '../models/task.model.js';

export class Connector<T extends { id: number }> {
    constructor() {}

    async findAll(): Promise<Array<iTask>> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const cursor = collection.find();
        const result = await (cursor.toArray() as unknown as Promise<
            Array<iTask>
        >);
        connect.close();
        return result;
    }

    async find(id: string): Promise<iTask | undefined> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOne({
            _id: dbId,
        })) as unknown as iTask;
        if (result === null) return undefined;
        connect.close();
        return result;
    }

    async create(data: Partial<iTask>): Promise<iTask> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const result = (await collection.insertOne(
            data
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }

    async update(id: string, data: Partial<iTask>): Promise<iTask> {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }

    async delete(id: string) {
        const { connect, collection } = await mongoConnect(
            'ISDI202205',
            'tasks'
        );
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });
        connect.close();
        if (!result.value) return { status: 404 };
        return { status: 202 };
    }
}
