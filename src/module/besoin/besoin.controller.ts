import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Put,
    Body,
    Post,
    NotFoundException,
    HttpException,
    Delete,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import { JsonView } from 'src/helpers/utils/JsonView';
import { BesoinService } from './besoin.service'
import { BesoinEntity } from './besoin.entity';

@Controller('besoin')
export class BesoinController {
    constructor(
        private readonly besoinService : BesoinService
    ){}

    @Get()
    public async getAllBesoin(){
        const besoin = await this.besoinService.getAll();
        return JsonView.dataResponse(besoin, "Liste des besoins", HttpStatus.OK);
    }

    @Get('total')
    public async getCountBesoin(){
        const total = await this.besoinService.findCount();
        return JsonView.dataResponse(total, "Nombre total de fiche de besoins")
    }

    @Get(':id')
    public async getBesoinById(@Param('id', ParseIntPipe) id: number){
        const besoin = await this.besoinService.getById(id);
        if (besoin){
            return JsonView.dataResponse(besoin, "", HttpStatus.OK);
        }
        throw new HttpException("Le besoin n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postBesoin(@Body(new ValidationPipe({transform:true})) besoinDto: BesoinEntity){
        const besoin = await this.besoinService.creating(besoinDto);
        if (besoin){
            return JsonView.dataResponse(besoin, "Le besoin a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':besoinId')
    public async updateBesoin(@Param('besoinId', ParseIntPipe) besoinId: number, @Body(new ValidationPipe({transform:true})) besoinDto: BesoinEntity){
        const besoin = await this.besoinService.updating(besoinId, besoinDto);
        if (besoin){
            return JsonView.dataResponse(besoin, "Le besoin à été modifié avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car besoin inexistant", HttpStatus.NOT_FOUND);
    }

    @Delete(':besoinId')
    public async deleteBesoin(@Param('besoinId', ParseIntPipe) besoinId: number){
        const besoin = await this.besoinService.deleting(besoinId);
        if (besoin){
            return "Besoin supprimé";
        }
        throw new HttpException("Suppression impossible car besoin inexistant", HttpStatus.NOT_FOUND);
    }

    
}
