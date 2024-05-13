import { OrderDetails } from "./orderdetails.entity";
import { Users } from "./users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orders'
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'date'})
    date: Date;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;
}