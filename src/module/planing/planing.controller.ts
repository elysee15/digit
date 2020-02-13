import {Controller, Get, HttpStatus, Param, Put, Body, Post, HttpException, Delete, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { PlaningService } from './planing.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { PlaningEntity } from './planing.entity';

@Controller('planing')
export class PlaningController {
    constructor(
        private readonly planingService : PlaningService
    ){}

    @Get()
    public async getAllPlaning(){
        const planing = await this.planingService.getAll();
        return JsonView.dataResponse(planing, "Liste des planing", HttpStatus.OK);
    }

    @Get(':id')
    public async getPlaningByID(@Param('id', ParseIntPipe) id: number){
        const planing = await this.planingService.getById(id);
        if (planing){
            return JsonView.dataResponse(planing, "", HttpStatus.OK);
        }
        throw new HttpException("Ce planing n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postPlaning(@Body() planingDto){
        const planing = await this.planingService.creating(planingDto);
        if (planing){
            return JsonView.dataResponse(planing, "Le planing a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':planingId')
    public async updatePlaning(@Param('planingId', ParseIntPipe) planingId: number, @Body() planingDto: PlaningEntity){
        const planing = await this.planingService.updating(planingId, planingDto);
        if (planing){
            return JsonView.dataResponse(planing, "Le planing à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car planing inexistant", HttpStatus.NOT_FOUND);
    }

    @Delete(':planingId')
    public async deletePlaning(@Param('planingId', ParseIntPipe) planingId: number){
        const planing = await this.planingService.deleting(planingId);
        if (planing){
            return "Planing supprimé";
        }
        throw new HttpException("Suppression impossible car planing inexistant", HttpStatus.NOT_FOUND);
    }

    
}
