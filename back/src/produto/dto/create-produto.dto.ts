import { IsNotEmpty, IsString, IsNumber, IsPositive, IsInt, Min, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  nome!: string;

  @IsNumber()
  @IsPositive({ message: 'Preço deve ser maior que zero' })
  preco!: number;

  @IsInt()
  @Min(0, { message: 'Estoque não pode ser negativo' })
  estoque!: number;

  @IsOptional()
  @IsInt()
  categoriaId!: number;
}