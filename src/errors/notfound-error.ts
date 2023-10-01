import { ApplicationError } from '../protocols';
export function notFoundError(message?: string): ApplicationError{
    const errorMsg = message || 'Not Found';
    return {
        name: "NotFoundError",
        message: errorMsg
    }
}