/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

export class Connector<T extends { id: number }> {
    data: Array<T>;
    path: string;
    constructor(private fileName: string) {
        this.data = [];
        this.path = `./src/data/${this.fileName}.json`;
    }

    private async readFile() {
        return JSON.parse(await fs.readFile(this.path, { encoding: 'utf-8' }));
    }

    private async writeFile(data: Array<T>) {
        return await fs.writeFile(this.path, JSON.stringify(data), {
            encoding: 'utf-8',
        });
    }

    async findAll(): Promise<Array<T>> {
        const fileData = await this.readFile();
        return fileData;
    }
    async find(id: number): Promise<T | undefined> {
        const fileData = await this.readFile();
        const item = fileData.find((item: T) => item.id === id);
        return item;
    }
    async create(data: Partial<T>): Promise<T> {
        const fileData = await this.readFile();
        const newItem = { ...data, id: fileData[fileData.length - 1].id + 1 };
        fileData.push(newItem);
        this.writeFile(fileData);
        return newItem as T;
    }
    async update(id: number, data: Partial<T>): Promise<T> {
        let fileData = await this.readFile();
        if (data.id) delete data.id;
        let updateItem: unknown;
        fileData = fileData.map((item: T) => {
            if (item.id === id) {
                updateItem = { ...item, ...data };
                return updateItem;
            } else {
                return item;
            }
        });
        this.writeFile(fileData);
        return updateItem as T;
    }
    async delete(id: number) {
        let fileData = await this.readFile();
        const prevLength = fileData.length;
        fileData = fileData.filter((item: T) => item.id !== id);
        if (prevLength === fileData.length) return { status: 404 };
        this.writeFile(fileData);
        return { status: 202 };
    }
}
