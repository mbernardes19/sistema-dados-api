import { Module, HttpModule } from '@nestjs/common';
import { enterpriseProviders } from './enterprise.provider';
import { DatabaseModule } from '../database/database.module';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...enterpriseProviders,
    EnterpriseService
  ],
  controllers: [EnterpriseController],
  exports: [ EnterpriseService ],
})
export class EnterpriseModule {}
