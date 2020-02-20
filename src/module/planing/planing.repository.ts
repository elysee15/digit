import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { PlaningEntity } from "./planing.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(PlaningEntity)
export class PlaningRepository extends Repository<PlaningEntity> {
  constructor(
    @InjectRepository(PlaningEntity)
    private readonly planingRepository: Repository<PlaningEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.planingRepository.find();
  }

  async findById(planingId: number) {
    return await this.planingRepository.findOne(planingId);
  }

  async created(planingDto: PlaningEntity) {
    return await this.planingRepository.save(planingDto);
  }

  async updated(planingId: number, planingDto: PlaningEntity) {
    return await this.planingRepository.update(planingId, planingDto);
  }

  async deleted(planingDto: PlaningEntity) {
    return await this.planingRepository.remove(planingDto);
  }
}
