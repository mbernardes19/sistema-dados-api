import {Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enterprise } from './enterprise.entity';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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
}