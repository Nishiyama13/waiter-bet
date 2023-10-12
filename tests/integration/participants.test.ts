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

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('POST /participants', () => {
    it('Should response with status 400 when body is not given', async () => {
        const response = await server.post('/participants');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('Should response with status 400 when body is not valid, name not sent', async () => {
        const invalidBody = { balance: faker.number.int({min: 1000})} ;

        const response = await server.post('/participants').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '\"name\" is required' ]
        });
    });

    it('Should response with status 400 when body is not valid, balance not sent', async () => {
        const invalidBody = { name: faker.person.fullName()} ;

        const response = await server.post('/participants').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '"balance" is required' ]
        });
    });

    it('Should response with status 400 when balance is less than 1000', async () => {
        const generateInvalidBalanceParticipantBody = ({
            name: faker.person.fullName(),
            balance: 100,
        });

        const response = await server.post('/participants').send(generateInvalidBalanceParticipantBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '"balance\" must be greater than or equal to 1000' ]
        });
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
            await server.post('/participants').send(generateValidParticipantBody); 
            const participantDuplicate = generateValidParticipantBody;

            const response = await server.post('/participants').send(participantDuplicate); 

            expect(response.status).toBe(httpStatus.CONFLICT);
        });
    });
});

describe('GET /participants', () => {
    it('Should response with status 200 and an empty array when participants has not exist', async () => {
        const response = await server.get('/participants');

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
    });

    it('Should response with status 200 and a list of participants', async () => {
        await createParticipant();
        await createParticipant();
        const response = await server.get('/participants');

        expect(response.status).toBe(httpStatus.OK);
    });
});

describe('GET /participants/:id', () => {
    it('Should response with status 400 when id is not valid, negative id', async () => {      
        const invalidId = -1
        const response = await server.get(`/participants/${invalidId}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '"id" must be a positive number' ]
        });
    });

    it('Should response with status 200 and a data of participant by id, without registered bets', async () => {
        const participant = await createParticipant();
        const participantId = participant.id;
        const response = await server.get(`/participants/${participantId}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
            id: participant.id,
            createdAt: participant.createdAt.toISOString(),
            updatedAt: participant.updatedAt.toISOString(),
            name: participant.name,
            balance: participant.balance,
            bets: []
        });
    });
});