import { faker } from '@faker-js/faker';
//import dayjs from 'dayjs';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createParticipant } from '../factories';
import { cleanDb } from '../helpers';
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

    it('Should response with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.person.fullName()]:faker.person.fullName} ;

        const response = await server.post('/participants').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When body is valid', () => {
        const generateValidParticipantBody = ({
            name: faker.person.fullName(),
            balance: 1000,
        });

        it('Shoulder response with status 201 when given participant name unique', async () => {

            const response = await server.post('/participants').send(generateValidParticipantBody); 

            expect(response.status).toBe(httpStatus.CREATED);
        });

        it('Shoulder response with status 409 when the participant already exist', async () => {
            const participantDuplicate = generateValidParticipantBody;

            const response = await server.post('/participants').send(participantDuplicate); 

            expect(response.status).toBe(httpStatus.CONFLICT);
        });
    })
});