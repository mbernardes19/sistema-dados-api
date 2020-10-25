import { Connection } from "typeorm";
import { ProdServInfo } from "src/model/prod-serv-info.entity";

export const prodServInfoProviders = [
    {
        provide: 'PROD_SERV_INFO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ProdServInfo),
        inject: ['DATABASE_CONNECTION']
    }
]