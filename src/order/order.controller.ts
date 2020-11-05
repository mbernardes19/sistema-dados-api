import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('/:orderNumber')
    getOrder(@Param('orderNumber') orderNumber) {
        return this.orderService.getOrderByNumber(orderNumber)
    }
}
