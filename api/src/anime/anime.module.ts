import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService, PrismaService, HelpersService],
})
export class AnimeModule {}
