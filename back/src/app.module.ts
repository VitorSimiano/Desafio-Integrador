import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { ChurnModule } from './churn/churn.module';


@Module({
  imports: [PrismaModule, ClienteModule, PedidoModule, ProdutoModule, CategoriaModule, RelatorioModule, ChurnModule],
})
export class AppModule {}
