import {Controller, Get, HttpStatus, Param, Put, Body, Post, HttpException, Delete, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { FamilleDeMissionService } from './famille-de-mission.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { FamilleDeMissionEntity } from './famille-de-mission.entity';

@Controller('familles-de-mission')
export class FamilleDeMissionController {
    constructor(
        private readonly familleDeMissionService : FamilleDeMissionService
    ){}

    @Get()
    public async getAllFamille(){
        const famille = await this.familleDeMissionService.getAll();
        return JsonView.dataResponse(famille, "Mission families was successfully found", HttpStatus.OK);
    }

    @Get(':id')
    public async getFamilleByID(@Param('id', ParseIntPipe) id: number){
        const famille = await this.familleDeMissionService.getById(id);
        return JsonView.dataResponse(famille, "Mission family was found successfully", HttpStatus.OK);
    }

    @Post()
    public async postPlaning(@Body(new ValidationPipe()) data: FamilleDeMissionEntity){
        const famille = await this.familleDeMissionService.creating(data);
        if (famille){
            return JsonView.dataResponse(famille, "Mission family was save successfully", HttpStatus.CREATED);
        }
        throw new HttpException("Impossible to record, try again", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updatePlaning(@Param('planingId', ParseIntPipe) planingId: number, @Body(new ValidationPipe()) data: FamilleDeMissionEntity){
        const famille = await this.familleDeMissionService.updating(planingId, data);
        return JsonView.dataResponse(famille, "Mission family was successfully updated", HttpStatus.OK);
    }

    @Delete(':id')
    public async deleteFamille(@Param('id', ParseIntPipe) id: number){
        const famille = await this.familleDeMissionService.deleting(id);
        return JsonView.dataResponse(famille, "Mission family was successfully deleted")
    }

    
}
