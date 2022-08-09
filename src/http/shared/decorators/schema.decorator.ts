import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Schema = createParamDecorator((data: unknown, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest<Request>();

  const { schema } = request.headers;

  return String(schema);
});
