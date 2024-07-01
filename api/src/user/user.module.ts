import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelpersService } from 'src/helpers/helpers.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '5m'}
    })
  ],
  controllers: [UserController],
  providers: [UserService, HelpersService, AuthService],
})
export class UserModule {}
