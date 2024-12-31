import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages, Products } from './entities';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages]),
    CategoriesModule,
  ],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
