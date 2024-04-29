import { Order } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50})
    name: string;

    @Column({length: 50, unique: true})
    email: string;

    @Column({length: 20})
    password: string;

    @Column({nullable: true})
    phone: number;

    @Column({length: 50, nullable: true})
    country: string;

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({length:50, nullable: true})
    city: string;


    @OneToMany(() => Order, order => order.user)
    orders: Order[];

}