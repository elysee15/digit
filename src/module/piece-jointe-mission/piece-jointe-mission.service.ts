import { Injectable, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PieceJointeMissionRepository } from './piece-jointe-mission.repository';


@Injectable()
export class PieceJointeMissionService {
    constructor(
        private readonly pieceJointeMissionRepository: PieceJointeMissionRepository
    ){}

    async getAll(){
        return await this.pieceJointeMissionRepository.findAll();
    }

    async getById(pieceId){
        const piece = await this.pieceJointeMissionRepository.findById(pieceId);
        if (piece){
            return piece;
        }
        return null;
    }

    async creating(pieceDto){
        return await this.pieceJointeMissionRepository.created(pieceDto);
    }

    async updating(pieceId, pieceDto){
        const piece = await this.pieceJointeMissionRepository.findById(pieceId);
        if (piece){
            await this.pieceJointeMissionRepository.updated(pieceId, pieceDto);
            return piece;
        }
        return null;
    }

    async deleting(pieceId){
        const piece = await this.pieceJointeMissionRepository.findById(pieceId);
        if (piece){
            try {
                return this.pieceJointeMissionRepository.deleted(piece);
            } catch(e){
                throw new InternalServerErrorException("Suppression impossible car piece jointe est en cours d'utilisation");
            }
        }
        return null;
    }
}
