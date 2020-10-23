import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { ProfServInfo } from './prod-serv-info';

@Entity()
export class Order {
    @PrimaryColumn()
    orderNumber: string;

    @Column()
    orderStatus: string;

    @Column()
    items: Item[];

    @Column()
    orderCode: string;

    @Column()
    emissionDate: Date;

    @Column()
    OcNumber: string;

    @Column()
    OcItemNumber: string;

    @Column()
    itemOrdered: number;

    @Column()
    prodServCodeInfo: ProfServInfo;

    @Column()
    itemStatus: string;

    @Column()
    requestedQuantity: number;

    @Column()
    billedQuantity: number;

    @Column()
    pendingQuantity: number;

    @Column()
    deliveryDate: Date;

    @Column()
    billingPredictionDate: Date;

    @Column()
    billAvailableDocDate: string;

    @Column()
    billingDate: Date;

    @Column()
    collectionNumber: string;
}