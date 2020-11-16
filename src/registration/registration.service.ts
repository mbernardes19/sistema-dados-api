import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import UserDto from 'src/data-management/interfaces/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
    constructor(
        @Inject('UserService')
        private readonly userService: UserService
    ) {}

    async register(userDto: UserDto) {
        const hashedPass = await bcrypt.hash(userDto.password, 10);
        userDto.password = hashedPass;
        await this.userService.create(userDto);
    }
}
