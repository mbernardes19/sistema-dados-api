import {Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ProfServInfo {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @Column()
    complement: string;
}