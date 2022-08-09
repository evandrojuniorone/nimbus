import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization } = request.headers;

    const [, token] = authorization.split(' ');

    this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const payload = this.jwtService.decode(token) as { company: string };

    request.headers.schema = payload.company;

    return true;
  }
}
