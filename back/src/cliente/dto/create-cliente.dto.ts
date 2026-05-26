import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  nome!: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @IsString()
  cidade!: string;

  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @IsString()
  estado!: string;

  @IsNotEmpty({ message: 'País é obrigatório' })
  @IsString()
  pais!: string;
}