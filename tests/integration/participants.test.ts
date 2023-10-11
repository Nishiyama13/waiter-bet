//import { faker } from '@faker-js/faker';
//import dayjs from 'dayjs';
import httpStatus from 'http-status';
import supertest from 'supertest';
//import { createParticipant } from '../factories';
import { cleanDb } from '../helpers';
//import { duplicateParticipantError } from '../errors';
import app, { init } from '@/app';

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /participants', () => {
    it('Should response with status 400 when body is not given', async () => {
        const response = await server.post('/participants');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
});