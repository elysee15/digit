import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { FamilleDeMissionEntity } from "./famille-de-mission.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(FamilleDeMissionEntity)
export class FamilleDeMissionRepository extends Repository<
  FamilleDeMissionEntity
> {
  constructor(
    @InjectRepository(FamilleDeMissionEntity)
    private readonly familleRepository: Repository<FamilleDeMissionEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.familleRepository.find();
  }

  async findById(categorieId: number) {
    return await this.familleRepository.findOne(categorieId);
  }

  async created(categorieDto: FamilleDeMissionEntity) {
    return await this.familleRepository.save(categorieDto);
  }

  async updated(id: number, familleDto: FamilleDeMissionEntity) {
    return await this.familleRepository.update(id, familleDto);
  }

  async deleted(categorieDto: FamilleDeMissionEntity) {
    return await this.familleRepository.remove(categorieDto);
  }
}
