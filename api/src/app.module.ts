import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AnimeService } from './anime/anime.service';
import { UserController } from './user/user.controller';
import { AnimeController } from './anime/anime.controller';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { UserFavoritesModule } from './user-favorites/user-favorites.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HelpersModule } from './helpers/helpers.module';
import { HelpersService } from './helpers/helpers.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule, AnimeModule, UserFavoritesModule, PrismaModule, HelpersModule, AuthModule],
  controllers: [UserController, AnimeController],
  providers: [UserService, AnimeService, PrismaService, HelpersService, AuthService],
})
export class AppModule {}
