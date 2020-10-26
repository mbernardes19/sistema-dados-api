import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';
import UserDto from 'src/data-management/interfaces/user.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import UserAlreadyRegisteredException from './errors/UserAlreadyRegisteredException';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
        @Inject('EnterpriseService')
        private readonly enterpriseService: EnterpriseService
    ) {}
    
    async getByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email }, relations: ['enterprise'] });
    }

    async userExists(email: string): Promise<boolean> {
        const userExists = await this.userRepository.findOne({where: { email }})
        return userExists ? true : false;
    }

    async create(userDto: UserDto): Promise<void> {
        const userAlreadyRegistered = await this.userExists(userDto.email);
        if (userAlreadyRegistered) {
            throw new UserAlreadyRegisteredException('User already registered');
        }
        const user = new User();
        const enterprise = await this.enterpriseService.getByEnterpriseName(userDto.enterpriseName)
        user.email = userDto.email;
        user.name = userDto.name;
        user.password = userDto.password;
        user.isAdmin = userDto.isAdmin;
        user.enterprise = enterprise;
        await this.userRepository.save(user);
    }
}
