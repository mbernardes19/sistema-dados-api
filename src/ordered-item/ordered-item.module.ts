import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { orderedItemProviders } from './ordered-item.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderedItemProviders,
  ],
  exports: [...orderedItemProviders]
})
export class OrderedItemModule {}
