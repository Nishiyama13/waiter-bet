import { ApplicationError } from '../protocols';
export function duplicateParticipantError(message?: string): ApplicationError{
    const errorMsg = message || 'Username already registered, choose another name.';
    return {
        name: "DuplicateParticipantError",
        message: errorMsg
    }
}
