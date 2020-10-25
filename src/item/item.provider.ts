import { Connection } from "typeorm";
import { Item } from "src/model/item.entity";

export const itemProviders = [
    {
        provide: 'ITEM_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Item),
        inject: ['DATABASE_CONNECTION']
    }
]