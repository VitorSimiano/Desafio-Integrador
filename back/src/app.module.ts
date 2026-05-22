import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [PrismaModule, ClienteModule],
})
export class AppModule {}