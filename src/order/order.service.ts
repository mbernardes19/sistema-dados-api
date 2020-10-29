import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/model/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>
    ) {}

    async getOrdersFromEnterprise(enterpriseName: string): Promise<Order[]> {
        return await this.orderRepository.find({ order: { orderNumber: 'ASC' }, relations: ['orderedItems'] , where: {enterprise: { name: enterpriseName }}})
    }
}
