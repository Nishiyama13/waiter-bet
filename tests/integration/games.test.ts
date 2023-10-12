import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createGame } from '../factories';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
    await init();
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('POST /games', () => {
    it('Should response with status 400 when body is not given', async () => {
        const response = await server.post('/games');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

});

