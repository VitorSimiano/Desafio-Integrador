import { IsNumber, IsPositive, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class UpdateProdutoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Preço deve ser maior que zero' })
  preco?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Estoque não pode ser negativo' })
  estoque?: number;

  @IsOptional()
  @IsInt()
  categoriaId?: number;
}