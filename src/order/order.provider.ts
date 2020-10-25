import { Connection } from "typeorm";
import { Order } from "src/model/order.entity";

export const orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['DATABASE_CONNECTION']
    }
]