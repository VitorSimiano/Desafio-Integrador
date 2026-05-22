import {
  Controller, Get, Post, Delete,
  Body, Param, ParseIntPipe,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  criar(@Body() dto: CreatePedidoDto) {
    return this.pedidoService.criar(dto);
  }

  @Get()
  listarTodos() {
    return this.pedidoService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.buscarPorId(id);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remover(id);
  }
}