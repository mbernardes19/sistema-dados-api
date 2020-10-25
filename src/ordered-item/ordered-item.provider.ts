import { Connection } from "typeorm";
import { OrderedItem } from "src/model/ordered-item.entity";

export const orderedItemProviders = [
    {
        provide: 'ORDERED_ITEM_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderedItem),
        inject: ['DATABASE_CONNECTION']
    }
]