import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { BudgetRepository } from "./budget.repository";
import { BudgetEntity } from "./budget.entity";

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async getAll() {
    return await this.budgetRepository.findAll();
  }

  async getById(budgetId: number) {
    const budget = await this.budgetRepository.findById(budgetId);
    if (budget) {
      return budget;
    }
    throw new NotFoundException("Ce budget n'existe pas");
  }

  async creating(data: BudgetEntity) {
    return await this.budgetRepository.created(data);
  }

  async updating(budgetId, data) {
    const budget = await this.budgetRepository.findById(budgetId);
    if (budget) {
      await this.budgetRepository.updated(budgetId, data);
      return budget;
    }
    throw new NotFoundException(
      "Modification impossible car budget inexistant"
    );
  }

  async deleting(budgetId) {
    const budget = await this.budgetRepository.findById(budgetId);
    if (budget) {
      try {
        return await this.budgetRepository.deleted(budget);
      } catch (e) {
        throw new ConflictException(
          "Impossible de supprimer car ce budget est en cours d'utilisation",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException("Suppression impossible car budget inexistant");
  }
}
