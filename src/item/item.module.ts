import { Module } from '@nestjs/common';
import { itemProviders } from './item.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemProviders,
  ],
  exports: [...itemProviders]
})
export class ItemModule {}
