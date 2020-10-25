import {Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity('Enterprise')
export class Enterprise {
    @Column()
    id: number

    @PrimaryColumn()
    name: string;

    @OneToMany(() => Order, order => order.enterprise)
    orders: Order[]

    @OneToMany(() => User, user => user.enterprise)
    user: User;
}