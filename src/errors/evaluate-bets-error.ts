import { ApplicationError } from '../protocols';
export function evaluateBetsError(message?: string): ApplicationError{
    const errorMsg = message || 'Error evaluating bets';
    return {
        name: "EvaluateBetsError",
        message: errorMsg
    }
}