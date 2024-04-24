import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


@Injectable()
export class LoggerMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Path: ${req.path} - Method: ${req.method} - Time: ${new Date().toLocaleString()}`);
        next();
    }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    console.log(`Path: ${req.path} - Method: ${req.method} - Time: ${new Date().toLocaleString()}`);
    next();
}