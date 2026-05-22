import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  criar(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.criar(dto);
  }

  @Get()
  listarTodos() {
    return this.categoriaService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.buscarPorId(id);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.remover(id);
  }
}
