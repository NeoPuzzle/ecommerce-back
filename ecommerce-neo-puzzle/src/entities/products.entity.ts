import { Categories } from "src/entities/categories.entity";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})

export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 50, unique: true, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number;

    @Column({type: 'int', nullable: false})
    stock: number;

    @Column({type: 'text',default: 'https://www.pngitem.com/pimgs/m/407-4074353_defectos-criticos-de-un-producto-hd-png-download.png'})
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];

}
