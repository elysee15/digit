import {Controller, Get, HttpStatus, Param, Put, Body, Post, NotFoundException, HttpException, Delete, ParseIntPipe} from '@nestjs/common';
import { JsonView } from '../../helpers/utils/JsonView';
import { PieceJointeMissionService } from './piece-jointe-mission.service';
import { PieceJointeMissionEntity } from './piece-jointe-mission.entity';

@Controller('piece-jointe-mission')
export class PieceJointeMissionController {
    constructor(
        private readonly pieceJointeMissionService : PieceJointeMissionService
    ){}

    @Get()
    public async getAllPiece(){
        const piece = await this.pieceJointeMissionService.getAll();
        return JsonView.dataResponse(piece, "Liste des pieces jointes", HttpStatus.OK);
    }

    @Get(':id')
    public async getPieceById(@Param('id', ParseIntPipe) id: number){
        const piece = await this.pieceJointeMissionService.getById(id);
        if (piece){
            return JsonView.dataResponse(piece, "", HttpStatus.OK);
        }
        throw new HttpException("La piece jointe n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postPieceJointeMission(@Body() pieceDto){
        const piece = await this.pieceJointeMissionService.creating(pieceDto);
        if (piece){
            return JsonView.dataResponse(piece, "La pièce jointe a été enregistrée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updatePieceJointeMission(@Param('id', ParseIntPipe) id: number, @Body() pieceDto: PieceJointeMissionEntity){
        const piece = await this.pieceJointeMissionService.updating(id, pieceDto);
        if (piece){
            return JsonView.dataResponse(piece, "La piece jointe à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car piece jointe inexistante", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deletePieceJointeMission(@Param('id', ParseIntPipe) id: number){
        const piece = await this.pieceJointeMissionService.deleting(id);
        if (piece){
            return "Piece jointe de mission supprimée";
        }
        throw new HttpException("Suppression impossible car piece jointe inexistante", HttpStatus.NOT_FOUND);
    }

    
}
