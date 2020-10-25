import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Matheus20031997*',
            database: 'test',
            entities: [
                __dirname + '/../model/*.entity{.ts,.js}',
            ],
            synchronize: true
        })
    }
]