import { Injectable, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PieceJointeMissionRepository } from './piece-jointe-mission.repository';
import { PieceJointeMissionEntity } from './piece-jointe-mission.entity';


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
        throw new NotFoundException("Attachements doesn't exist");
    }

    async creating(data){
        return await this.pieceJointeMissionRepository.created(data);
    }

    async updating(pieceId: number, data: PieceJointeMissionEntity){
        const piece = await this.pieceJointeMissionRepository.findById(pieceId);
        if (piece){
            await this.pieceJointeMissionRepository.updated(pieceId, data);
            return piece;
        }
        throw new NotFoundException("Modification impossible car piece jointe inexistante");

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
        throw new NotFoundException("Suppression impossible car piece jointe inexistante");
    }
}
