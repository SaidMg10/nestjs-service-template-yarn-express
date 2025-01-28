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
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
