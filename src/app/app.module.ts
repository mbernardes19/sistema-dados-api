import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataManagementModule } from 'src/data-management/data-management.module';

@Module({
  imports: [DataManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
