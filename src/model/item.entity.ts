import {Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderedItem } from './ordered-item.entity';

@Entity('Item')
export class Item {

    @PrimaryColumn()
    number: number;

    @OneToMany(() => OrderedItem, orderedItem => orderedItem.item)
    orderedItems: OrderedItem[]
}