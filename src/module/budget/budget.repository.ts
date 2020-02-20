import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { BudgetEntity } from "./budget.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(BudgetEntity)
export class BudgetRepository extends Repository<BudgetEntity> {
  constructor(
    @InjectRepository(BudgetEntity)
    private readonly budgetRepository: Repository<BudgetEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.budgetRepository.find();
  }

  async findById(budgetId: number) {
    return await this.budgetRepository.findOne(budgetId);
  }

  async created(budgetDto: BudgetEntity) {
    return await this.budgetRepository.save(budgetDto);
  }

  async updated(budgetId: number, budgetDto: BudgetEntity) {
    return await this.budgetRepository.update(budgetId, budgetDto);
  }

  async deleted(budgetDto: BudgetEntity) {
    return await this.budgetRepository.remove(budgetDto);
  }
}
