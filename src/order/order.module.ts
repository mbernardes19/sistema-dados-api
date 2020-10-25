import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { orderProviders } from './order.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders,
  ],
  exports: [...orderProviders]
})
export class OrderModule {}
