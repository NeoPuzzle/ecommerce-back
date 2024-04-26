import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


function validate(request: Request) {
    if(!request.headers.authorization) return false;
    const authHeader = request.headers.authorization;
    //* authHeader = Basic: email:password
    const auth = authHeader.split(' ')[1];
    //* auth = email:password
    if(!auth) return false;

    const [email, password] = auth.split(':');
    if(!email || !password) return false;
    return true;
}


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validate(request);
        
    }
}