import { ApplicationError } from '../protocols';
export function insufficientFundsError(message?: string): ApplicationError{
    const errorMsg = message || 'Insufficient funds!';
    return {
        name: "InsufficientFundsError",
        message: errorMsg
    }
}