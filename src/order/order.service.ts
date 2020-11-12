import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/model/order.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate'

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>
    ) {}

    async getOrdersFromEnterprise(enterpriseName: string, paginationOptions: IPaginationOptions): Promise<Pagination<Order>> {
        return paginate<Order>(this.orderRepository, paginationOptions, {order: {orderNumber: 'ASC'}, relations: ['enterprise'], where: {enterprise: {name: enterpriseName}}});
    }

    async getOrdersFromAllEnterprises(paginationOptions: IPaginationOptions): Promise<Pagination<Order>> {
        return paginate<Order>(this.orderRepository, paginationOptions, {order: {enterprise: 'ASC'}, relations: ['enterprise']});
    }

    async getOrderByNumber(orderNumber: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: {orderNumber},
            relations: ['orderedItems', 'enterprise', 'orderedItems.item', 'orderedItems.prodServInfo']
        }) 
        return order;
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Order>> {
      const queryBuilder = this.orderRepository.createQueryBuilder('o');
      queryBuilder.orderBy('o.orderNumber', 'ASC');
      return paginate<Order>(this.orderRepository, options);
    }
}
