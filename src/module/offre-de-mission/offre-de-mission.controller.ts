import {Controller, Get, HttpStatus, Param, HttpException, Put, Body, Delete, Post, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { OffreDeMissionService } from './offre-de-mission.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { OffreDeMissionEntity } from './offre-de-mission.entity';

@Controller('offre')
export class OffreDeMissionController {
    constructor(
        private readonly offreDeMissionService : OffreDeMissionService
    ){}

    @Get()
    public async getAllOffreDeMission(){
        const offre = await this.offreDeMissionService.getAll();
        return JsonView.dataResponse(offre, "Liste des offres de mission", HttpStatus.OK);
    }

    @Get('total')
    public async getFindCount(){
        const total = await this.offreDeMissionService.findCount()
        return JsonView.dataResponse(total, 'Nombre d\'offre de mission', HttpStatus.OK);
    }

    @Get(':id')
    public async getOffreDeMissionById(@Param('id', ParseIntPipe) id: number){
        const offre = await this.offreDeMissionService.getById(id);
        if (offre){
            return JsonView.dataResponse(offre, "", HttpStatus.OK);
        }
        throw new HttpException("Cette offre de mission n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postOffreDeMission(@Body(new ValidationPipe({transform: true}))  offreDto: OffreDeMissionEntity){
        const offre = await this.offreDeMissionService.creating(offreDto);
        if (offre){
            return JsonView.dataResponse(offre, "L'offre de mission a été enregistrée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateOffreDeMission(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({transform: true})) offreDto: OffreDeMissionEntity){
        const offre = await this.offreDeMissionService.updating(id, offreDto);
        if (offre){
            return JsonView.dataResponse(offre, "L'offre de mission à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException(`Modification impossible car offre de mission ${id} inexistante`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deleteOffreDeMission(@Param('id', ParseIntPipe) id: number){
        const projet = await this.offreDeMissionService.deleting(id);
        if (projet){
            return "Offre de mission supprimé";
        }
        throw new HttpException("Suppression impossible car offre de mission inexistante", HttpStatus.NOT_FOUND);
    }

}
