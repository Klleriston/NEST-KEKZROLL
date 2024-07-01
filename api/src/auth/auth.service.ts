import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly helpers: HelpersService
    ) {}

    async signIn(userDTO: CreateUserDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(userDTO.email); 
        if (!user || !(await bcrypt.compare(userDTO.password.toString(), user.password))) {
            this.helpers.forbidden("Forbidden!");
            return
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return { message: 'User created successfully:', user };
    }
}
