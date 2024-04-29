import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
// import { Category } from "src/categories/categories.entity";
// import { Product } from "src/products/products.entity";
import { User } from "src/users/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";


dotenvConfig({path: '.env.development'});


const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: true,
    autoLoadEntities: true,
    synchronize: false,
    dropSchema: true,

};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

// export const ProductModel = connectionSource.getRepository(Product);
// export const CategorieModel = connectionSource.getRepository(Category);