import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HelpersService],
})
export class UserModule {}
