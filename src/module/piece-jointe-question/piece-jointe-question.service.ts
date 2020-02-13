import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PieceJointeQuestionRepository } from './piece-jointe-question.repository';


@Injectable()
export class PieceJointeQuestionService {
    constructor(
        private readonly pieceJointeQuestionRepository: PieceJointeQuestionRepository
    ){}

    async getAll(){
        return await this.pieceJointeQuestionRepository.findAll();
    }

    async getById(pieceId){
        const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
        if (piece){
            return piece;
        }
        return null;
    }

    async creating(pieceDto){
        return await this.pieceJointeQuestionRepository.created(pieceDto);
    }

    async updating(pieceId, pieceDto){
        const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
        if (piece){
            await this.pieceJointeQuestionRepository.updated(pieceId, pieceDto);
            return piece;
        }
        return null;
    }

    async deleting(pieceId){
        const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
        if (piece){
            try {
                return this.pieceJointeQuestionRepository.deleted(piece);
            } catch(e){
                throw new InternalServerErrorException('Suppression impossible car piece jointe est en cours d\'utilisation');
            }
        }
        return null;
    }
}
