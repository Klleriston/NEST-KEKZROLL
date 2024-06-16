import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
