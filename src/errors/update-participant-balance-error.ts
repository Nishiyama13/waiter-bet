import { ApplicationError } from '../protocols';
export function updateParticipantBalanceError(message?: string): ApplicationError{
    const errorMsg = message || 'Error updating participant balance';
    return {
        name: "UpdateParticipantBalanceError",
        message: errorMsg
    }
}