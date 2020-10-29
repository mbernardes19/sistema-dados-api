import { Module, HttpModule } from '@nestjs/common';
import { enterpriseProviders } from './enterprise.provider';
import { DatabaseModule } from '../database/database.module';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [DatabaseModule, OrderModule],
  providers: [
    ...enterpriseProviders,
    EnterpriseService
  ],
  controllers: [EnterpriseController],
  exports: [ EnterpriseService ],
})
export class EnterpriseModule {}
