import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/orderdetails/orderdetails.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column()
    stock: number;

    @Column({default: 'https://www.pngitem.com/pimgs/m/407-4074353_defectos-criticos-de-un-producto-hd-png-download.png'})
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToMany(() => OrderDetails)
    @JoinTable()
    orderDetails: OrderDetails[];

}
