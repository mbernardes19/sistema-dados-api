import {Entity, PrimaryColumn, OneToMany, Generated, Column } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity('Enterprise')
export class Enterprise {
    @PrimaryColumn()
    name: string;

    @OneToMany(() => Order, order => order.enterprise)
    orders: Order[]

    @OneToMany(() => User, user => user.enterprise)
    user: User;
}