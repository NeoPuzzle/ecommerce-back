import { OrderDetails } from "src/orderdetails/orderdetails.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'date'})
    date: Date;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.order)
    @JoinColumn()
    orderDetails: OrderDetails;
}