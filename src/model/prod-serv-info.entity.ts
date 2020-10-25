import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderedItem } from './ordered-item.entity';

@Entity('ProdServInfo')
export class ProdServInfo {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @Column()
    complement: string;

    @OneToMany(() => OrderedItem, orderedItem => orderedItem.prodServInfo)
    orderedItems: OrderedItem[]
}