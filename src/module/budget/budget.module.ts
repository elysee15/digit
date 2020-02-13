import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetEntity } from './budget.entity';
import { BudgetRepository } from './budget.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity])],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository]
})
export class BudgetModule {}
