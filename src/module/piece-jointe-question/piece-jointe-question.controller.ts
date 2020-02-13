import { Controller, Get, HttpStatus, Param, Put, Body, Post, NotFoundException, HttpException, Delete } from '@nestjs/common';
import { JsonView } from 'src/helpers/utils/JsonView';
import { PieceJointeQuestionService } from './piece-jointe-question.service';
import { PieceJointeQuestionEntity } from './piece-jointe-question.entity';

@Controller('piece-jointe-question')
export class PieceJointeQuestionController {
    constructor(
        private readonly pieceJointeQuestionService : PieceJointeQuestionService
    ){}

    @Get()
    public async getAllPiece(){
        const piece = await this.pieceJointeQuestionService.getAll();
        return JsonView.dataResponse(piece, "Liste des pieces jointes des questions", HttpStatus.OK);
    }

    @Get(':id')
    public async getPieceById(@Param('id') id: number){
        const piece = await this.pieceJointeQuestionService.getById(id);
        if (piece){
            return JsonView.dataResponse(piece, "", HttpStatus.OK);
        }
        throw new HttpException("La piece jointe n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postPieceJointeMission(@Body() pieceDto){
        const piece = await this.pieceJointeQuestionService.creating(pieceDto);
        if (piece){
            return JsonView.dataResponse(piece, "La pièce jointe a été enregistrée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':id')
    public async updatePieceJointeMission(@Param('id') id: number, @Body() pieceDto: PieceJointeQuestionEntity){
        const piece = await this.pieceJointeQuestionService.updating(id, pieceDto);
        if (piece){
            return JsonView.dataResponse(piece, "La piece jointe à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car piece jointe inexistante", HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    public async deletePieceJointeQuestion(@Param('id') id: number){
        const piece = await this.pieceJointeQuestionService.deleting(id);
        if (piece){
            return "Piece jointe de question supprimée";
        }
        throw new HttpException("Suppression impossible car piece jointe inexistante", HttpStatus.NOT_FOUND);
    }

    
}
