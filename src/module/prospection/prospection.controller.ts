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
    ValidationPipe, ParseIntPipe,
} from '@nestjs/common';
import { JsonView } from '../../helpers/utils/JsonView';
import { ProspectionService } from './prospection.service';
import { ProspectionEntity } from './prospection.entity';

@Controller('prospection')
export class ProspectionController {
    constructor(
        private readonly prospectionService: ProspectionService,
    ) {}

    @Get()
    public async getAllProspection() {
        const prospection = await this.prospectionService.getAll();
        return JsonView.dataResponse(prospection, 'Liste des prospections', HttpStatus.OK);
    }

    @Get('total')
    public async getCountProspection() {
        const total = await this.prospectionService.findCount();
        return JsonView.dataResponse(total, 'Total des prospections', 201);
    }

    @Get(':id')
    public async getProspectionById(@Param('id', ParseIntPipe) id: number) {
        const prospection = await this.prospectionService.getById(id);
        if (prospection) {
            return JsonView.dataResponse(prospection, '', HttpStatus.OK);
        }
        throw new NotFoundException(`La prospection avec l'id ${id} n'existe pas`);
    }

    @Post()
    public async postProspection(@Body(new ValidationPipe({transform: true})) prospectionDto: ProspectionEntity) {
        const prospection = await this.prospectionService.creating(prospectionDto);
        if (prospection) {
            return JsonView.dataResponse(prospection, 'Le prospection a été enregistré avec succès', HttpStatus.OK);
        }
        throw new HttpException('Enregistrement impossible, veuillez réessayer', HttpStatus.NOT_MODIFIED);
    }

    @Put(':prospectionId')
    public async updateProspection(@Param('prospectionId', ParseIntPipe) prospectionId: number, @Body(new ValidationPipe({transform: true})) prospectionDto: ProspectionEntity) {
        const prospection = await this.prospectionService.updating(prospectionId, prospectionDto);
        if (prospection) {
            return JsonView.dataResponse(prospection, 'La prospection à été modifiée avec succès', HttpStatus.OK);
        }
        throw new NotFoundException(`Modification impossible, la prospection avec l'id ${prospectionId} n'existe pas`)
    }

    @Delete(':prospectionId')
    public async deleteProspection(@Param('prospectionId', ParseIntPipe) prospectionId: number) {
        const prospection = await this.prospectionService.deleting(prospectionId);
        if (prospection) {
            return 'prospection supprimée';
        }
        throw new NotFoundException(`Suppression impossible, la prospection avec l'id ${prospectionId} n'existe pas`);
    }


}
