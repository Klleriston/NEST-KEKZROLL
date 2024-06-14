import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findAll() {
    if (this.prismaService.user === null) return "No users found!" 
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    if (this.prismaService.user == null) return "No users found!" 
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (user == null) {
        throw new NotFoundException('User not found');
      }

      await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });

      return 'User deleted successfully';
    } catch (error) {
      console.error(error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}