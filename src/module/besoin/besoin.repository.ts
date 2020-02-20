import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BesoinEntity } from "./besoin.entity";

@Injectable()
@EntityRepository(BesoinEntity)
export class BesoinRepository extends Repository<BesoinEntity> {
  constructor(
    @InjectRepository(BesoinEntity)
    private readonly besoinRepository: Repository<BesoinEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.besoinRepository.find();
  }

  async findById(besoinId: number) {
    return await this.besoinRepository.findOne(besoinId);
  }

  async created(data: BesoinEntity) {
    return await this.besoinRepository.save(data);
  }

  async updated(besoinId: number, data: BesoinEntity) {
    return await this.besoinRepository.update(besoinId, data);
  }

  async deleted(data: BesoinEntity) {
    return await this.besoinRepository.remove(data);
  }

  async countBesoin() {
    return await this.besoinRepository
      .createQueryBuilder("BesoinEntity")
      .select("COUNT(besoin.id)", "count")
      .getCount();
  }
}
