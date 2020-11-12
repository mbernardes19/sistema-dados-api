import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Enterprise } from './enterprise.entity';
import { OrderedItem } from './ordered-item.entity';
import { User } from './user.entity';

@Entity('Order')
export class Order {
    @PrimaryColumn()
    orderNumber: string;

    @Column()
    orderStatus: string;

    @OneToMany(() => OrderedItem, orderedItem => orderedItem.order, {
        cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE'
    })
    orderedItems: OrderedItem[];

    @Column()
    orderCode: string;

    @Column()
    emissionDate: Date;

    @Column()
    OcNumber: string;

    @Column()
    OcItemNumber: string;

    @Column({nullable: true})
    billingPredictionDate: Date;

    @Column()
    collectionNumber: string;

    @Column({ nullable: true })
    deliveryDate?: Date;

    @ManyToOne(() => Enterprise, enterprise => enterprise.orders, {
        cascade: ['insert']
    })
    enterprise: Enterprise

    @ManyToOne(() => User, user => user.orders, {
        nullable: true
    })
    user: User
}