import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/model/order.entity';
import { differenceInMilliseconds } from 'date-fns';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>
    ) {}

    async getOrdersFromEnterprise(enterpriseName: string): Promise<Order[]> {
        return await this.orderRepository.find({ order: { orderNumber: 'ASC'}, relations: ['orderedItems', 'enterprise'] , where: {enterprise: { name: enterpriseName }}})
    }

    async getOrdersFromAllEnterprises(): Promise<Order[]> {
        return await this.orderRepository.find({ order: { orderNumber: 'ASC'}, relations: ['orderedItems', 'enterprise'] })
    }

    async getOrderByNumber(orderNumber: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: {orderNumber},
            relations: ['orderedItems', 'enterprise', 'orderedItems.item', 'orderedItems.prodServInfo']
        }) 
        const deliveryDate = this.getFarestDeliveryDate(order)
        order.deliveryDate = deliveryDate;
        // console.log('ORDER', order);
        return order;
    }

    private getFarestDeliveryDate(order: Order): Date {
        let difference = 0;
        let farestDate = new Date();
        order.orderedItems.map(item => {
          if (item.deliveryDate) {
            let diff;
            if (item.deliveryDate > new Date()) {
              diff = differenceInMilliseconds(item.deliveryDate, new Date())
            } else {
              diff = differenceInMilliseconds(new Date(), item.deliveryDate)
            }
            
            if (diff > difference) {
                difference = diff;
                farestDate = item.deliveryDate;
            }
          }
        })
        return farestDate;
    }
}
