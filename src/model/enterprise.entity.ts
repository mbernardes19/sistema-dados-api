import {Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Enterprise {
    @PrimaryColumn()
    id: number

    @Column()
    name: string;
}