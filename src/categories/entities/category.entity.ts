import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 127, unique: true })
  name: string;
}
