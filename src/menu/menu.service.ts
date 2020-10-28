import { Injectable } from '@nestjs/common';
import { menu, adminMenu} from './menu';
import Menu from './interfaces/menu';

@Injectable()
export class MenuService {
    getMenu(): Menu[] {
        return menu
    }

    getAdminMenu(): Menu[] {
        return adminMenu
    }
}
