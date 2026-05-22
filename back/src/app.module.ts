import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [PrismaModule, ClienteModule, PedidoModule],
})
export class AppModule {}