import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BesoinEntity } from "./besoin.entity";


@Injectable()
@EntityRepository(BesoinEntity)

export class BesoinRepository extends Repository<BesoinEntity>{
    constructor(
        @InjectRepository(BesoinEntity)
        private readonly besoinRepository: Repository<BesoinEntity>
    ){
        super();
    }

    async findAll(){
        return await this.besoinRepository.find();
    }

    async findById(besoinId: number){
        return await this.besoinRepository.findOne(besoinId);
    }

    async created(besoinDto: BesoinEntity){
        return await this.besoinRepository.save(besoinDto);
    }

    async updated(besoinId: number, besoinDto: BesoinEntity){
        return await this.besoinRepository.update(besoinId, besoinDto);
    }

    async deleted(besoinDto: BesoinEntity){
        return await this.besoinRepository.remove(besoinDto)
    }

    async countBesoin(){
        return await this.besoinRepository.createQueryBuilder('BesoinEntity')
        .select("COUNT(besoin.id)", 'count')
        .getCount();
    }
}