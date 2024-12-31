import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { ProductImages } from '../entities';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: ProductImages[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  categories?: Category[];
}
