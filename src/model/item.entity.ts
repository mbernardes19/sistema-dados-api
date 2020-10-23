import {Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryColumn()
    number: number;

    @Column()
    status: string;
}