import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImages {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 255 })
  secureUrl: string;
  @Column('varchar', { length: 255 })
  publicId: string;
  @ManyToOne(() => Products, (products) => products.images)
  product: Products;
}
