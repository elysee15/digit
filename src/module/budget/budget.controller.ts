import {Controller, Get, HttpStatus, Param, Put, Body, Post, HttpException, Delete, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';

import { JsonView } from '../../helpers/utils/JsonView';
import { BudgetService } from './budget.service';
import { BudgetEntity } from './budget.entity';

@Controller('budget')
export class BudgetController {
    constructor(
        private readonly budgetService : BudgetService
    ){}

    @Get()
    public async getAllBudget(){
        const budget = await this.budgetService.getAll();
        return JsonView.dataResponse(budget, "Liste des budgets", HttpStatus.OK);
    }

    @Get(':id')
    public async getBudgetById(@Param('id', ParseIntPipe) id: number){
        const budget = await this.budgetService.getById(id);
        if (budget){
            return JsonView.dataResponse(budget, "", HttpStatus.OK);
        }
        throw new HttpException("Ce budget n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postBudget(@Body() budgetDto){
        const budget = await this.budgetService.creating(budgetDto);
        if (budget){
            return JsonView.dataResponse(budget, "Le budget a été enregistrée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateBudget(@Param('id', ParseIntPipe) id: number, @Body() budgetDto: BudgetEntity){
        const budget = await this.budgetService.updating(id, budgetDto);
        if (budget){
            return JsonView.dataResponse(budget, "Le budget à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car budget inexistant", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deleteBudget(@Param('id', ParseIntPipe) id: number){
        const budget = await this.budgetService.deleting(id);
        if (budget){
            return "Budget supprimé";
        }
        throw new HttpException("Suppression impossible car budget inexistant", HttpStatus.NOT_FOUND);
    }

    
}
