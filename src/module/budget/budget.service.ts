import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BudgetRepository } from './budget.repository';

@Injectable()
export class BudgetService {
    constructor(
        private readonly budgetRepository: BudgetRepository
    ){}

    async getAll(){
        return await this.budgetRepository.findAll();
    }

    async getById(budgetId){
        const budget = await this.budgetRepository.findById(budgetId);
        if (budget){
            return budget;
        }
        return null;
    }

    async creating(budgetDto){
        return await this.budgetRepository.created(budgetDto);
    }

    async updating(budgetId, budgetDto){
        const budget = await this.budgetRepository.findById(budgetId);
        if (budget){
            await this.budgetRepository.updated(budgetId, budgetDto);
            return budget;
        }
        return null;
    }

    async deleting(budgetId){
        const budget = await this.budgetRepository.findById(budgetId);
        if (budget){
            try {
                return this.budgetRepository.deleted(budget);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car ce budget est en cours d'utilisation");
            }
        }
        return null;
    }
}
