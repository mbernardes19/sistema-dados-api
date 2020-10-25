import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}
    
    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email }, relations: ['enterprise'] });
    }
}
