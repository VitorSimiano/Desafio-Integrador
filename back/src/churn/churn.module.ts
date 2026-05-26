import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChurnController } from './churn.controller';
import { ChurnService } from './churn.service';

@Module({
  imports: [HttpModule],
  controllers: [ChurnController],
  providers: [ChurnService],
})
export class ChurnModule {}