import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Enterprise } from './enterprise.entity';
import { Order } from './order.entity';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ default: false })
    isAdmin: boolean

    @ManyToOne(() => Enterprise, enterprise => enterprise.user)
    enterprise: Enterprise;

    @OneToMany(() => Order, order => order.user, {
        nullable: true
    })
    orders: Order[]
}