import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { OffreDeMissionEntity } from "./offre-de-mission.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(OffreDeMissionEntity)
export class OffreDeMissionRepository extends Repository<OffreDeMissionEntity>{
    constructor(
        @InjectRepository(OffreDeMissionEntity) 
        private readonly offreDeMissionRepository: Repository<OffreDeMissionEntity>
    ){
        super();
    }

    findAll(){
        return this.offreDeMissionRepository.find();
    }

    async findById(id: number){
        return await this.offreDeMissionRepository.findOne(id);
    }

    async created(offreDto: OffreDeMissionEntity){
        return await this.offreDeMissionRepository.save(offreDto);
    }

    async updated(id: number, offreDto: OffreDeMissionEntity){
        return await this.offreDeMissionRepository.update(id, offreDto);
    }

    async deleted(offreDto: OffreDeMissionEntity){
        return await this.offreDeMissionRepository.remove(offreDto)
    }

    async countOffre(){
        return await this.offreDeMissionRepository.createQueryBuilder('OffreDeMissionEntity')
                .select("COUNT(offre_de_mission.id)", "count")
                .getCount()
    }
}