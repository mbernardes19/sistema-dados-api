import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('orders')
    async getUserOrders(
        @Query('page') page: number,
        @Query('limit') limit: number, 
        @Request() req
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.userService.getUserOrders(req.user, {page, limit})
    }
}
