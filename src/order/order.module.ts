import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { orderProviders } from './order.provider';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
    OrderService,
  ],
  exports: [...orderProviders, OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
