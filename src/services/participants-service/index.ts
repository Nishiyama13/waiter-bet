import { Participant } from "@prisma/client";
import { CreateParticipantInput } from "../../protocols";
import participantsRepository from "../../repositories/participants-repository";

async function createParticipant({ name, balance }: CreateParticipantInput): Promise <Participant> {

    //await validateUniqueName(name);

    const participant = await participantsRepository.create({
        name,
        balance,
    });
    return participant;
}

const participantsService = {
    createParticipant,
}

export default participantsService;