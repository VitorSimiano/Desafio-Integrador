import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';

export class CreateItemPedidoDto {
  @IsInt()
  @IsPositive({ message: 'ID do produto inválido' })
  produtoId?: number;

  @IsInt()
  @IsPositive({ message: 'Quantidade deve ser maior que zero' })
  quantidade?: number;
}

export class CreatePedidoDto {
  @IsInt()
  @IsPositive({ message: 'ID do cliente inválido' })
  clienteId?: number;

  @IsOptional()
  @IsInt()
  categoriaId?: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'O pedido deve ter pelo menos um item' })
  @ValidateNested({ each: true })
  @Type(() => CreateItemPedidoDto)
  itens: CreateItemPedidoDto[] = [];
}