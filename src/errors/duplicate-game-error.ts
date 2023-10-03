import { ApplicationError } from '../protocols';
export function duplicateGameError(message?: string): ApplicationError{
    const errorMsg = message || 'This team pair already has an active game registration';
    return {
        name: "DuplicateGameError",
        message: errorMsg
    }
}
