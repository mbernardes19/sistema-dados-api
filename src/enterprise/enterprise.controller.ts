import { Controller, Get, UseGuards, Request, Param, Query } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('enterprise')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnterpriseController {
    constructor(private readonly enterpriseService: EnterpriseService) {}

    @Roles('admin')
    @Get()
    getAll() {
        return this.enterpriseService.getAllEnterprises();
    }

    @Roles('admin')
    @Get('orders')
    getEnterpriseOrders(
        @Query('enterpriseName') enterpriseName: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    )
    {
        limit = limit > 100 ? 100 : limit;
        return this.enterpriseService.getEntepriseOrders(enterpriseName, {page, limit})
    }
}
