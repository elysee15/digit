import {Controller, Get, HttpStatus, Param, Put, Body, Post, HttpException, Delete, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';

import { JsonView } from '../../helpers/utils/JsonView';
import { BudgetService } from './budget.service';
import { BudgetEntity } from './budget.entity';

@Controller('budgets')
export class BudgetController {
    constructor(
        private readonly budgetService : BudgetService
    ){}

    @Get()
    public async getAllBudget(){
        const budget = await this.budgetService.getAll();
        if (Object.keys(budget).length === 0){
            return JsonView.dataResponse(budget, "Objects empty", HttpStatus.OK);
        } else{
            return JsonView.dataResponse(budget, "Objects was successfully found", HttpStatus.OK);
        }
    }

    @Get(':id')
    public async getBudgetById(@Param('id', ParseIntPipe) id: number){
        const budget = await this.budgetService.getById(id);
        return JsonView.dataResponse(budget, "Object was successfully found", HttpStatus.OK);  
    }

    @Post()
    public async postBudget(@Body(new ValidationPipe()) data: BudgetEntity){
        const budget = await this.budgetService.creating(data);
        if (budget){
            return JsonView.dataResponse(budget, "Le budget a été enregistrée avec succès", HttpStatus.CREATED);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateBudget(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) data: BudgetEntity){
        const budget = await this.budgetService.updating(id, data);
        return JsonView.dataResponse(budget, "Le budget à été modifiée avec succès", HttpStatus.OK);
        
    }

    @Delete(':id')
    public async deleteBudget(@Param('id', ParseIntPipe) id: number){
        const budget = await this.budgetService.deleting(id);
        return JsonView.dataResponse(budget, "Object was succcessfully deleted", HttpStatus.OK)
    }

    
}
