import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { orderProviders } from './order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
    OrderService,
  ],
  exports: [...orderProviders, OrderService]
})
export class OrderModule {}
