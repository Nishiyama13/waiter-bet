import { ApplicationError } from '../middlewares/error-handler';
export function finishGameError(message?: string): ApplicationError{
    const errorMsg = message || 'Error finish game';
    return {
        name: "FinishGameError",
        message: errorMsg
    }
}