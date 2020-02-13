import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProspectEntity } from "./prospect.entity";


@Injectable()
@EntityRepository(ProspectEntity)

export class ProspectRepository extends Repository<ProspectEntity>{
    constructor(
        @InjectRepository(ProspectEntity)
        private readonly prospectRepository: Repository<ProspectEntity>
    ){
        super();
    }

    async findAll(){
        return await this.prospectRepository.find();
    }

    async findById(prospectId: number){
        return await this.prospectRepository.findOne(prospectId);
    }

    async created(prospectDto: ProspectEntity){
        return await this.prospectRepository.save(prospectDto);
    }

    async updated(prospectId: number, prospectDto: ProspectEntity){
        return await this.prospectRepository.update(prospectId, prospectDto);
    }

    async deleted(prospectDto: ProspectEntity){
        return await this.prospectRepository.remove(prospectDto);
    }

    // nombre de prospects
    async countProspect() {
      return await getRepository(ProspectEntity)
        .createQueryBuilder('prospect')
        .select('SUM(prospect.id)', 'sum')
        .getCount();
    }
}
