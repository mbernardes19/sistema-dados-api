import {Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('Enterprise')
export class Enterprise {
    @Column()
    id: number

    @PrimaryColumn()
    name: string;

    @OneToMany(() => Order, order => order.enterprise)
    orders: Order[]
}