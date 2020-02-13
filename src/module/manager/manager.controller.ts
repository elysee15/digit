import {Controller, Get, HttpStatus, Param, HttpException, Post, Body, Put, Delete, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { ManagerEntity } from './manager.entity';

@Controller('manager')
export class ManagerController {
    constructor(
        private readonly managerService: ManagerService,
    ){}

    @Get()
    public async getAllManager(){
        const manager = await this.managerService.getAll();
        return JsonView.dataResponse(manager, "Liste des managers", HttpStatus.OK);
    }

    @Get(":id")
    public async getManagerById(@Param('id', ParseIntPipe) id: number){
        const manager = await this.managerService.getById(id);
        if (manager){
            return JsonView.dataResponse(manager, "", HttpStatus.OK);
        }
        throw new HttpException("Le manager n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postManager(@Body(new ValidationPipe({transform: true})) managerDto){
        const manager = await this.managerService.creating(managerDto);
        if (manager){
            return JsonView.dataResponse(manager, "Le manager a été créé avec succès", HttpStatus.OK)
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(":id")
    public async updateManager(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({transform: true})) managerDto: ManagerEntity){
        const manager = await this.managerService.updating(id, managerDto);
        if (manager){
            return JsonView.dataResponse(manager, "Le manager à été modifié avec succès", HttpStatus.OK);
        }
        throw new HttpException("Impossible de faire de mise à jour car le manager n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deleteManager(@Param('id', ParseIntPipe) id : number){
        const manager = await this.managerService.deleting(id);
        if (manager){
            return "Le manager a été supprimé";
        }
        throw new HttpException("Suppression impossible car manager inexistant", HttpStatus.NOT_FOUND);
    }

}
