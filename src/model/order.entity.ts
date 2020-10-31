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
        cascade: ['insert']
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

    @Column({nullable: true})
    billDocNumber: string;

    @Column({nullable: true})
    billingDate: Date;

    @Column()
    collectionNumber: string;

    @ManyToOne(() => Enterprise, enterprise => enterprise.orders, {
        cascade: ['insert']
    })
    enterprise: Enterprise

    @ManyToOne(() => User, user => user.orders, {
        nullable: true
    })
    user: User

    deliveryDate?: Date;
}