import {Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProdServInfo } from './prod-serv-info.entity';
import { Item } from './item.entity';

@Entity('OrderedItem')
export class OrderedItem {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Item, item => item.orderedItems, {
        cascade: ['insert']
    })
    item: Item

    @Column()
    status: string;

    @ManyToOne(() => ProdServInfo, prodServInfo => prodServInfo.orderedItems, {
        cascade: ['insert']
    })
    prodServInfo: ProdServInfo;
    
    @Column()
    requestedQuantity: number;
    
    @Column()
    availableQuantity: number;
    
    @Column()
    pendingQuantity: number;
    
    @Column()
    deliveryDate: Date;

    @ManyToOne(() => Order, order => order.orderedItems)
    order?: Order
}