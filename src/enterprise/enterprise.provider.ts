import { Connection } from "typeorm";
import { Enterprise } from "../model/enterprise.entity";

export const enterpriseProviders = [
    {
        provide: 'ENTERPRISE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Enterprise),
        inject: ['DATABASE_CONNECTION']
    }
]