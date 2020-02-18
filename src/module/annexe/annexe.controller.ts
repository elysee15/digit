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

@Controller('annexes')
export class AnnexeController {
    constructor(
        private readonly annexeService : AnnexeService
    ){}

    @Get()
    public async getAllAnnexe(){
        const famille = await this.annexeService.getAll();
        return JsonView.dataResponse(famille, "Object was found with success", HttpStatus.OK);
    }

    @Get(':id')
    public async getAnnexeById(@Param('id', ParseIntPipe) id: number){
        const annexe = await this.annexeService.getById(id);
        return JsonView.dataResponse(annexe, "Object was successfully found", HttpStatus.OK);
    }

    @Post()
    public async postAnnexe(@Body(new ValidationPipe()) data){
        const annexe = await this.annexeService.creating(data);
        if (annexe){
            return JsonView.dataResponse(data, "Object was record successfully", HttpStatus.CREATED);
        }
        throw new HttpException("Cannot record, try again", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updateAnnexe(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe) data: AnnexeEntity){
        const annexe = await this.annexeService.updating(id, data);
        return JsonView.dataResponse(annexe, "Object was succcessfully modified", HttpStatus.OK);
    }

    @Delete(':id')
    public async deleteAnnexe(@Param('id', ParseIntPipe) id: number){
        const annexe = await this.annexeService.deleting(id);
        return JsonView.dataResponse(annexe, "Object was succcessfully deleted", HttpStatus.OK)        
        }
}
