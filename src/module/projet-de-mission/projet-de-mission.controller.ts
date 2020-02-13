import {Controller, Get, HttpStatus, Param, HttpException, Put, Body, Delete, Post, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { ProjetDeMissionService } from './projet-de-mission.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { ProjetDeMissionEntity } from './projet-de-mission.entity';

@Controller('projet')
export class ProjetDeMissionController {
    constructor(
        private readonly projetDeMissionService : ProjetDeMissionService
    ){}

    @Get()
    public async getAllProjetDeMission(){
        const projet = await this.projetDeMissionService.getAll();
        return JsonView.dataResponse(projet, "Liste des projets de mission", HttpStatus.OK);
    }


    @Get('total')
    public async getFindCount(){
        const total = await this.projetDeMissionService.findCount()
        return JsonView.dataResponse(total, 'Nombre de projet de mission', HttpStatus.OK);
    }

    @Get(':id')
    public async getProjetDeMissionById(@Param('id', ParseIntPipe) id: number){
        const projet = await this.projetDeMissionService.getById(id);
        if (projet){
            return JsonView.dataResponse(projet, "", HttpStatus.OK);
        }
        throw new HttpException("Ce projet de mission n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postProjetDeMission(@Body(new ValidationPipe({transform: true}))  projetDto: ProjetDeMissionEntity){
        const projet = await this.projetDeMissionService.creating(projetDto);
        if (projet){
            return JsonView.dataResponse(projet, "Le projet de mission a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateProjetDeMission(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({transform: true})) projetDto: ProjetDeMissionEntity){
        const projet = await this.projetDeMissionService.updating(id, projetDto);
        if (projet){
            return JsonView.dataResponse(projet, "Le projet de mission à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car projet de mission inexistant", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deleteProjetDeMission(@Param('id', ParseIntPipe) id: number){
        const projet = await this.projetDeMissionService.deleting(id);
        if (projet){
            return "Projet de mission supprimé";
        }
        throw new HttpException("Suppression impossible car projet de mission inexistant", HttpStatus.NOT_FOUND);
    }

}
