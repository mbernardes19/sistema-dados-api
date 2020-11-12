import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';
import UserDto from 'src/data-management/interfaces/user.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import UserAlreadyRegisteredError from './errors/UserAlreadyRegisteredError';
import EmptyUserError from './errors/EmptyUserError';
import { Order } from 'src/model/order.entity';
import { differenceInMilliseconds } from 'date-fns'
import { Enterprise } from 'src/model/enterprise.entity';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

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

    private isEmpty(userDto: UserDto): boolean {
        return userDto.email === '' || userDto.enterpriseName === '' || userDto.name === '' || userDto.password === '';
    }

    async create(userDto: UserDto): Promise<void> {
        if(this.isEmpty(userDto)) {
            throw new EmptyUserError('User info is empty')
        }
        const userAlreadyRegistered = await this.userExists(userDto.email);
        if (userAlreadyRegistered) {
            throw new UserAlreadyRegisteredError('User already registered');
        }
        const user = new User();
        const enterprise = await this.enterpriseService.getByEnterpriseName(userDto.enterpriseName)
        if (!enterprise) {
            await this.enterpriseService.create([{ name: userDto.enterpriseName }])
        }
        user.email = userDto.email;
        user.name = userDto.name;
        user.password = userDto.password;
        user.isAdmin = userDto.isAdmin;
        user.enterprise = await this.enterpriseService.getByEnterpriseName(userDto.enterpriseName)
        await this.userRepository.save(user);
    }

    async getUserOrders(user: User, paginationOptions: IPaginationOptions): Promise<Order[]> {
        return await this.enterpriseService.getEntepriseOrders(user.enterprise.name, paginationOptions);
    }

    async getAllUsersFromEnterprise(enterpriseName: string): Promise<User[]> {
        const enterprise = new Enterprise();
        enterprise.name = enterpriseName;
        return await this.userRepository.find({ where: { enterprise: enterprise }, relations: ['enterprise', 'orders'] })
    }
}
