import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PieceJointeMissionEntity } from "./piece-jointe-mission.entity";

@Injectable()
@EntityRepository(PieceJointeMissionEntity)

export class PieceJointeMissionRepository extends Repository<PieceJointeMissionEntity>{
    constructor(
        @InjectRepository(PieceJointeMissionEntity)
        private readonly pieceJointeMissionRepository: Repository<PieceJointeMissionEntity>
    ){
        super();
    }

    async findAll(){
        return await this.pieceJointeMissionRepository.find();
    }

    async findById(pieceId: number){
        return await this.pieceJointeMissionRepository.findOne(pieceId);
    }

    async created(pieceDto: PieceJointeMissionEntity){
        return await this.pieceJointeMissionRepository.save(pieceDto);
    }

    async updated(pieceId: number, pieceDto: PieceJointeMissionEntity){
        return await this.pieceJointeMissionRepository.update(pieceId, pieceDto);
    }

    async deleted(pieceDto: PieceJointeMissionEntity){
        return await this.pieceJointeMissionRepository.remove(pieceDto)
    }
}