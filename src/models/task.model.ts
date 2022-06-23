/* eslint-disable no-unused-vars */
import { Connector } from '../bin/connector.js';

export interface iTask {
    id: number;
    title: string;
    responsible: string;
    isCompleted: boolean;
}

export class TaskModel extends Connector<iTask> implements iTask {
    id: number;
    constructor(
        public title: string = '',
        public responsible: string = '',
        public isCompleted: boolean = false
    ) {
        super();
        this.id = 0;
    }
}
