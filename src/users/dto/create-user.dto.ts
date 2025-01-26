import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/common/enums';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole; // Opcional, por si quieres permitir definir roles al crearlos

  @IsBoolean()
  @IsOptional()
  isActive?: boolean; // Opcional, puede usarse para crear usuarios inactivos
}
