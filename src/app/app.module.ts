import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataManagementModule } from 'src/data-management/data-management.module';
import { AuthModule } from 'src/auth/auth.module';
import { RegistrationModule } from 'src/registration/registration.module';
import { MenuModule } from 'src/menu/menu.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports: [DataManagementModule, AuthModule, RegistrationModule, MenuModule, EnterpriseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
