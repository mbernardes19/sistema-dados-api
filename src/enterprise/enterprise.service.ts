import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Enterprise } from 'src/model/enterprise.entity';
import EnterpriseDto from 'src/data-management/interfaces/enterprise-dto';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/model/order.entity';
import { differenceInMilliseconds } from 'date-fns';
import { User } from 'src/model/user.entity';
import { UserService } from 'src/user/user.service';
import {IPaginationOptions} from 'nestjs-typeorm-paginate'

@Injectable()
export class EnterpriseService {
  constructor(
    @Inject('ENTERPRISE_REPOSITORY')
    private readonly enterpriseRepository: Repository<Enterprise>,
    @Inject('OrderService')
    private readonly orderService: OrderService,
  ) {}

    async create(enterpriseDto: EnterpriseDto[]): Promise<void> {
        const enterprises: Enterprise[] = [];
        enterpriseDto.forEach(dto => {
            const enterprise = new Enterprise();
            enterprise.name = dto.name
            enterprises.push(enterprise);
        })
        await this.enterpriseRepository.save(enterprises);
    }

    async getByEnterpriseName(enterpriseName: string) {
      return await this.enterpriseRepository.findOne(enterpriseName)
    }

    async getAllEnterprises(): Promise<Enterprise[]> {
      return await this.enterpriseRepository.find();
    }

    async getEntepriseOrders(enterpriseName: string, paginationOptions: IPaginationOptions): Promise<Order[]> {
      let orders;
      if (!enterpriseName) {
        orders = await this.orderService.getOrdersFromAllEnterprises(paginationOptions);
      } else {
        orders = await this.orderService.getOrdersFromEnterprise(enterpriseName, paginationOptions);
      }
      return orders;
      // const ordersWithDeliveryDate: Order[] = orders.map(order => {
      //   const deliveryDate = this.getFarestDeliveryDate(order)
      //   order.deliveryDate = deliveryDate;
      //   return order;
      // })
      // return ordersWithDeliveryDate; 
      // return ordersWithDeliveryDate.sort((a, b) => (a.enterprise.name < b.enterprise.name) ? -1 : (a.enterprise.name > b.enterprise.name) ? 1 : 0)
    }

    // private getFarestDeliveryDate(order: Order): Date {
    //   let difference = 0;
    //   let farestDate = new Date();
    //   order.orderedItems.map(item => {
    //     if (item.deliveryDate) {
    //       let diff;
    //       if (item.deliveryDate > new Date()) {
    //         diff = differenceInMilliseconds(item.deliveryDate, new Date())
    //       } else {
    //         diff = differenceInMilliseconds(new Date(), item.deliveryDate)
    //       }
          
    //       if (diff > difference) {
    //           difference = diff;
    //           farestDate = item.deliveryDate;
    //       }
    //     }
    //   })
    //   return farestDate;
    // }
  }
