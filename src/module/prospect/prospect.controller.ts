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
import { JsonView } from '../../helpers/utils/JsonView';
import { ProspectService } from './prospect.service';
import { ProspectEntity } from './prospect.entity';

@Controller('prospect')
export class ProspectController {
    constructor(
        private readonly prospectService: ProspectService,
    ) {}

    @Get()
    public async getAllProspect() {
        const prospect = await this.prospectService.getAll();
        return JsonView.dataResponse(prospect, 'Liste des prospects', HttpStatus.OK);
    }

    @Get('total')
    public async getCountProspect() {
        const prospect = await this.prospectService.countProspect();
        return JsonView.dataResponse(prospect , 'Nombre total des prospects', 201);
    }

    @Get(':id')
    public async getProspectById(@Param('id', ParseIntPipe) id: number) {
        const prospect = await this.prospectService.getById(id);
        if (prospect) {
            return JsonView.dataResponse(prospect, '', HttpStatus.OK);
        }
        throw new HttpException('Le prospect n\'existe pas', HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postProspect(@Body(new ValidationPipe({transform: true})) prospectDto: ProspectEntity) {
        const prospect = await this.prospectService.creating(prospectDto);
        if (prospect) {
            return JsonView.dataResponse(prospect, 'Le prospect a été enregistré avec succès', HttpStatus.OK);
        }
        throw new HttpException('Enregistrement impossible, veuillez réessayer', HttpStatus.NOT_MODIFIED);
    }

    @Put(':prospectId')
    public async updateProspect(@Param('prospectId', ParseIntPipe) prospectId: number, @Body(new ValidationPipe({transform: true})) prospectDto: ProspectEntity) {
        const prospect = await this.prospectService.updating(prospectId, prospectDto);
        if (prospect) {
            return JsonView.dataResponse(prospect, 'Le prospect à été modifié avec succès', HttpStatus.OK);
        }
        throw new HttpException('Modification impossible car prospect inexistant', HttpStatus.NOT_FOUND);
    }

    @Delete(':prospectId')
    public async deleteProspect(@Param('prospectId', ParseIntPipe) prospectId: number) {
        const prospect = await this.prospectService.deleting(prospectId);
        if (prospect) {
            return 'Prospect supprimé';
        }
        throw new HttpException('Suppression impossible car prospect inexistant', HttpStatus.NOT_FOUND);
    }

}
