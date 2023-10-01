import { ApplicationError } from '../protocols';
export function createParticipantError(message?: string): ApplicationError{
    const errorMsg = message || 'Error creating participant';
    return {
        name: "CreateParticipantError",
        message: errorMsg
    }
}