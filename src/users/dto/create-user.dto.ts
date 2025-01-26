import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  //   @IsString()
  //   @MinLength(6)
  //   @MaxLength(50)
  //   @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password must have uppercase, lowercase letters, and a number',
  //   })
  //   password: string;

  @IsString()
  @IsOptional()
  role?: string; // Opcional, por si quieres permitir definir roles al crearlos

  @IsBoolean()
  @IsOptional()
  isActive?: boolean; // Opcional, puede usarse para crear usuarios inactivos
}
