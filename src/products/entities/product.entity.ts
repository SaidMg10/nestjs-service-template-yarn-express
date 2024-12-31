import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImages } from './images-product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { unique: true, length: 255 })
  name: string;
  @Column('text')
  description: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column('int', { default: 0 })
  stock: number;
  @OneToMany(() => ProductImages, (productImages) => productImages.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImages[];
  @ManyToMany(() => Category)
  @JoinTable({ name: 'products_categories' })
  categories: Category[];
}
