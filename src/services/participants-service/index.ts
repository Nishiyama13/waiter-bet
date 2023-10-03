import { Bet, Participant } from "@prisma/client";
import { CreateParticipantInput, ParticipantType } from "../../protocols";
import participantsRepository from "../../repositories/participants-repository";
import { duplicateParticipantError, notFoundError } from "../../errors";

async function  validateUniqueName(name:string) {
    const participantWithSameName = await participantsRepository.findParticipantByName(name);
    if (participantWithSameName) {
        throw duplicateParticipantError();
    }
}

async function createParticipant({ name, balance }: CreateParticipantInput): Promise <ParticipantType> {

    await validateUniqueName(name);

    const participant = await participantsRepository.create({
        name,
        balance,
    });
    const formattedParticipant = formatParticipant(participant)
    return formattedParticipant;
}

function formatParticipant(participant: Participant) {
    const formattedParticipant: ParticipantType = {
        id: participant.id,
        createdAt: participant.createdAt.toISOString(),
        updatedAt: participant.updatedAt.toISOString(),
        name: participant.name,
        balance: participant.balance,
    };
    return formattedParticipant;
}

async function getParticipants(): Promise<Participant[]> {
    const participants = await participantsRepository.findParticipants();
    if (!participants) throw notFoundError();
    return participants;
}

async function getParticipantById(id: number): Promise<Participant & { bets: Bet[] }> 
    {
    const participant = await participantsRepository.findParticipantById(id);

    if (!participant) throw notFoundError('Participant not found with id' + id);
    return participant; 
}


const participantsService = {
    createParticipant,
    getParticipants,
    getParticipantById,
}

export default participantsService;