import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ProjetDeMissionEntity } from "./projet-de-mission.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(ProjetDeMissionEntity)
export class ProjetDeMissionRepository extends Repository<ProjetDeMissionEntity>{
    constructor(
        @InjectRepository(ProjetDeMissionEntity) 
        private readonly projetDeMissionRepository: Repository<ProjetDeMissionEntity>
    ){
        super();
    }

    findAll(){
        return this.projetDeMissionRepository.find();
    }

    async findById(id: number){
        return await this.projetDeMissionRepository.findOne(id);
    }

    async created(projetDto: ProjetDeMissionEntity){
        return await this.projetDeMissionRepository.save(projetDto);
    }

    async updated(id: number, projetDto: ProjetDeMissionEntity){
        return await this.projetDeMissionRepository.update(id, projetDto);
    }

    async deleted(projetDto: ProjetDeMissionEntity){
        return await this.projetDeMissionRepository.remove(projetDto)
    }

    async countProjet(){
        return await this.projetDeMissionRepository.createQueryBuilder('ProjetDeMissionEntity')
                .select("COUNT(projet_de_mission.id)", "count")
                .getCount()
    }
}