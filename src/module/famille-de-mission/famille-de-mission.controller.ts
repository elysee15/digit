import {Controller, Get, HttpStatus, Param, Put, Body, Post, HttpException, Delete, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { FamilleDeMissionService } from './famille-de-mission.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { FamilleDeMissionEntity } from './famille-de-mission.entity';

@Controller('famille')
export class FamilleDeMissionController {
    constructor(
        private readonly familleDeMissionService : FamilleDeMissionService
    ){}

    @Get()
    public async getAllFamille(){
        const famille = await this.familleDeMissionService.getAll();
        return JsonView.dataResponse(famille, "Liste des familles de missions", HttpStatus.OK);
    }

    @Get(':id')
    public async getFamilleByID(@Param('id', ParseIntPipe) id: number){
        const famille = await this.familleDeMissionService.getById(id);
        if (famille){
            return JsonView.dataResponse(famille, "", HttpStatus.OK);
        }
        throw new HttpException("Cette famille de mission n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postPlaning(@Body() familleDto){
        const famille = await this.familleDeMissionService.creating(familleDto);
        if (famille){
            return JsonView.dataResponse(famille, "La famille de mission a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updatePlaning(@Param('planingId', ParseIntPipe) planingId: number, @Body() planingDto: FamilleDeMissionEntity){
        const famille = await this.familleDeMissionService.updating(planingId, planingDto);
        if (famille){
            return JsonView.dataResponse(famille, "La famille de mission a été modifié avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car famille de mission inexistante", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deleteFamille(@Param('id', ParseIntPipe) id: number){
        const famille = await this.familleDeMissionService.deleting(id);
        if (famille){
            return "Famille de mission supprimée";
        }
        throw new HttpException("Suppression impossible car famille de mission inexistante", HttpStatus.NOT_FOUND);
    }

    
}
