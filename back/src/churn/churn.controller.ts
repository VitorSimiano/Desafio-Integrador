import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChurnService } from './churn.service';

@Controller('churn')
export class ChurnController {
  constructor(private readonly churnService: ChurnService) {}

  @Get('cliente/:id')
  preverChurnCliente(@Param('id', ParseIntPipe) id: number) {
    return this.churnService.preverChurnCliente(id);
  }

  @Get('todos')
  preverChurnTodos() {
    return this.churnService.preverChurnTodos();
  }
  @Get('scoring')
scoringClientes() {
  return this.churnService.scoringClientes();
}
}