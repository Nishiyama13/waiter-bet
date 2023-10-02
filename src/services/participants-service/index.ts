import { Participant } from "@prisma/client";
import { CreateParticipantInput } from "../../protocols";
import participantsRepository from "../../repositories/participants-repository";
import { duplicateParticipantError, notFoundError } from "../../errors";

async function  validateUniqueName(name:string) {
    const participantWithSameName = await participantsRepository.findParticipantByName(name);
    if (participantWithSameName) {
        throw duplicateParticipantError();
    }
}

async function createParticipant({ name, balance }: CreateParticipantInput): Promise <Participant> {

    await validateUniqueName(name);

    const participant = await participantsRepository.create({
        name,
        balance,
    });
    return participant;
}

async function getParticipants(): Promise<Participant[]> {
    const participants = await participantsRepository.findParticipants();
    if (!participants) throw notFoundError();
    return participants;
}

const participantsService = {
    createParticipant,
    getParticipants,
}

export default participantsService;