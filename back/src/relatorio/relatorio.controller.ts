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
  @Get('clientes-resumo')
clientesComResumo() {
  return this.relatorioService.clientesComResumo();
}
@Get('historico-por-cliente')
historicoPorCliente() {
  return this.relatorioService.historicoPorCliente();
}

@Get('tempo-medio-compras')
tempoMedioEntreCompras() {
  return this.relatorioService.tempoMedioEntreCompras();
}
}