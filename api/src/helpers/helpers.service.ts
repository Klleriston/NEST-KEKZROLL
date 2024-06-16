import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class HelpersService {
  throwCustomError(message: string, status: HttpStatus) {
    throw new HttpException({ message }, status);
  }

  badRequest(message: string) {
    this.throwCustomError(message, HttpStatus.BAD_REQUEST);
  }

  notFound(message: string) {
    this.throwCustomError(message, HttpStatus.NOT_FOUND);
  }

  internalServerError(message: string) {
    this.throwCustomError(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  unauthorized(message: string) {
    this.throwCustomError(message, HttpStatus.UNAUTHORIZED);
  }

  forbidden(message: string) {
    this.throwCustomError(message, HttpStatus.FORBIDDEN);
  }
  
  noContent(message: string) {
    this.throwCustomError(message, HttpStatus.NO_CONTENT);
  }

}
