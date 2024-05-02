import { Orders } from "src/entities/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})

export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 50, nullable: false})
    name: string;

    @Column({type:'varchar', length: 50, unique: true, nullable: false})
    email: string;

    @Column({type:'varchar' , nullable: false})
    password: string;

    @Column({type:'int', nullable: true})
    phone: number;

    @Column({type:'varchar', length: 50, nullable: true})
    country: string;

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({type:'varchar', length:50, nullable: true})
    city: string;


    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Orders[];

}