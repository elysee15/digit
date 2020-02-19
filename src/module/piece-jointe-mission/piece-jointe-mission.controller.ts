import {Controller, Get, HttpStatus, Param, Put, Body, Post, NotFoundException, HttpException, Delete, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { JsonView } from '../../helpers/utils/JsonView';
import { PieceJointeMissionService } from './piece-jointe-mission.service';
import { PieceJointeMissionEntity } from './piece-jointe-mission.entity';

@Controller('pieces-jointes-mission')
export class PieceJointeMissionController {
    constructor(
        private readonly pieceJointeMissionService : PieceJointeMissionService
    ){}

    @Get()
    public async getAllPiece(){
        const piece = await this.pieceJointeMissionService.getAll();
        if (Object.keys(piece).length === 0){
            return JsonView.dataResponse(piece, "Objects empty", HttpStatus.OK);
        }
        return JsonView.dataResponse(piece, "Mission attachements was successfully found", HttpStatus.OK);
    }

    @Get(':id')
    public async getPieceById(@Param('id', ParseIntPipe) id: number){
        const piece = await this.pieceJointeMissionService.getById(id);
        return JsonView.dataResponse(piece, "Mission attachements was successfully found", HttpStatus.OK);
    }

    @Post()
    public async postPieceJointeMission(@Body() data: PieceJointeMissionEntity){
        const piece = await this.pieceJointeMissionService.creating(data);
        if (piece){
            return JsonView.dataResponse(piece, "La pièce jointe a été enregistrée avec succès", HttpStatus.CREATED);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updatePieceJointeMission(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) data: PieceJointeMissionEntity){
        const piece = await this.pieceJointeMissionService.updating(id, data);
        return JsonView.dataResponse(piece, "La piece jointe à été modifiée avec succès", HttpStatus.OK);
    }

    @Delete(':id')
    public async deletePieceJointeMission(@Param('id', ParseIntPipe) id: number){
        const piece = await this.pieceJointeMissionService.deleting(id);
        return JsonView.dataResponse(piece, "Pièce jointe supprimée avec succès", HttpStatus.OK)
    }

    
}
