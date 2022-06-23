import { mongoConnect } from './mongo';
import { MongoClient } from 'mongodb';

jest.mock('mongodb');

describe('Given the mongoConnect function', () => {
    const mockCollection = jest.fn();
    describe('When calling it', () => {
        test('Then it should open a connection with Mongo', () => {
            MongoClient.prototype.connect = jest.fn().mockReturnValue({
                db: jest.fn().mockReturnValue({
                    collection: mockCollection,
                }),
            });
            mongoConnect('', '');
            expect(MongoClient.prototype.connect).toHaveBeenCalled();
        });
    });
});
