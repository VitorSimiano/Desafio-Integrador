import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('vendas-por-estado')
  vendasPorEstado() {
    return this.relatorioService.vendasPorEstado();
  }

  @Get('vendas-por-cidade')
  vendasPorCidade() {
    return this.relatorioService.vendasPorCidade();
  }

  @Get('vendas-por-pais')
  vendasPorPais() {
    return this.relatorioService.vendasPorPais();
  }

  @Get('top-clientes')
  topClientes() {
    return this.relatorioService.topClientes();
  }

  @Get('produto-mais-vendido')
  produtoMaisVendido() {
    return this.relatorioService.produtoMaisVendido();
  }

  @Get('produto-maior-valor')
  produtoMaiorValor() {
    return this.relatorioService.produtoMaiorValor();
  }
}