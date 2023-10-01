import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export type ApplicationError = {
    name: string;
    message: string;
};

export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        });
    }

    console.log(err.name);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error"
    })
}
