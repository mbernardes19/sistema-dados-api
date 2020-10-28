import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getMenu(@Request() req) {
        if (req.user.isAdmin) {
            return this.menuService.getAdminMenu()
        } else {
            return this.menuService.getMenu()
        }

    }
}
