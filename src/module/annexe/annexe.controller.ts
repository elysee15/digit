import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Put,
    Body,
    Post,
    HttpException,
    Delete,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    NotFoundException
} from '@nestjs/common';
import { JsonView } from 'src/helpers/utils/JsonView';
import { AnnexeService } from './annexe.service';
import { AnnexeEntity } from './annexe.entity';

@Controller('annexe')
export class AnnexeController {
    constructor(
        private readonly annexeService : AnnexeService
    ){}
//commentaire
    @Get()
    public async getAllAnnexe(){
        const famille = await this.annexeService.getAll();
        return JsonView.dataResponse(famille, "Liste des annexes", HttpStatus.OK);
    }

    @Get(':id')
    public async getAnnexeById(@Param('id', ParseIntPipe) id: number){
        const annexe = await this.annexeService.getById(id);
        if (annexe){
            return JsonView.dataResponse(annexe, "", HttpStatus.OK);
        }
        throw new NotFoundException("Cet annexe n'existe pas");
    }

    @Post()
    public async postAnnexe(@Body() annexeDto){
        const annexe = await this.annexeService.creating(annexeDto);
        if (annexe){
            return JsonView.dataResponse(annexe, "L'annexe a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateAnnexe(@Param('id', ParseIntPipe) id: number, @Body() annexeDto: AnnexeEntity){
        const annexe = await this.annexeService.updating(id, annexeDto);
        if (annexe){
            return JsonView.dataResponse(annexe, "L'annexe a été modifié avec succès", HttpStatus.OK);
        }
        throw new NotFoundException("Modification impossible car annexe inexistant");
    }

    @Delete(':id')
    public async deleteAnnexe(@Param('id', ParseIntPipe) id: number){
        const annexe = await this.annexeService.deleting(id);
        if (annexe){
            return "Annexe supprimé";
        }
        throw new NotFoundException("Suppression impossible car annexe inexistant");
    }

    
}
