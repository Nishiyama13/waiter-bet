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

    it('Should response with status 400 when body is not valid, homeTeamName not sent', async () => {
        const invalidBody = { awayTeamName: faker.company.name()} ;

        const response = await server.post('/games').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '"homeTeamName" is required' ]
        });
    });

    it('Should response with status 400 when body is not valid, awayTeamName not sent', async () => {
        const invalidBody = { homeTeamName: faker.company.name()} ;

        const response = await server.post('/games').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
            name: 'InvalidDataError',
            message: 'Invalid data error',
            details: [ '"awayTeamName" is required' ]
        });
    });

    describe('When body is valid', () => {
        const generateValidGameBody = ({
            homeTeamName: faker.company.name(),
            awayTeamName: faker.company.name(),
        });

        it('Shoulder response with status 201 when given game unique or similar game has already been finalized', async () => {

            const response = await server.post('/games').send(generateValidGameBody); 

            expect(response.status).toBe(httpStatus.CREATED);        
        });

        it('Shoulder response with status 409 when the game already exist and game not yet finished', async () => {
            await server.post('/games').send(generateValidGameBody); 
            const participantDuplicate = generateValidGameBody;

            const response = await server.post('/games').send(participantDuplicate); 

            expect(response.status).toBe(httpStatus.CONFLICT);
        });
    });

});
