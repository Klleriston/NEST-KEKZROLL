import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly helpersService: HelpersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
        },
      });
     return {message: 'User created successfully:', user} 
    } catch (error) {
      return this.helpersService.badRequest('User not created');
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    if (users.length == 0) {
      return this.helpersService.noContent('');
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return this.helpersService.notFound('User not found');
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return this.helpersService.badRequest('User not found');
    }
    try {
      await this.prismaService.user.delete({
        where: { id: id },
      });
      return {message: "User deleted successfully"};
    } catch (error) {
      this.helpersService.internalServerError('User not deleted');
    }
  }
}
