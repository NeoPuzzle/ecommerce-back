import { Order } from "src/orders/orders.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orderdetails'
})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @OneToOne(() => Order, order => order.orderDetails)
    order: Order;

    @ManyToMany(() => Product)
    @JoinTable()
    product: Product[];
}