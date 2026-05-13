import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

/**
 * DTO para actualizar un usuario por HTTP.
 * Todos los campos son opcionales (PartialType).
 * Solo se actualizan los campos que se envíen.
 */
export class UpdateUserHttpDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(50)
  password?: string;
}
