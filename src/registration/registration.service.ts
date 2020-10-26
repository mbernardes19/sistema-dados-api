import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import UserDto from 'src/data-management/interfaces/user.dto';

@Injectable()
export class RegistrationService {
    constructor(
        @Inject('UserService')
        private readonly userService: UserService
    ) {}

    async register(userDto: UserDto) {
        await this.userService.create(userDto);
    }
}
