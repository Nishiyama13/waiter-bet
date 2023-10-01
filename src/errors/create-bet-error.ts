import { ApplicationError } from '../middlewares/error-handler';
export function createBetError(message?: string): ApplicationError{
    const errorMsg = message || 'Error creating bet';
    return {
        name: "CreateBetError",
        message: errorMsg
    }
}