import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AnnexeEntity } from "./annexe.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(AnnexeEntity)
export class AnnexeRepository extends Repository<AnnexeEntity> {
  constructor(
    @InjectRepository(AnnexeEntity)
    private readonly AnnexeRepository: Repository<AnnexeEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.AnnexeRepository.find();
  }

  async findById(annexeId: number) {
    return await this.AnnexeRepository.findOne(annexeId);
  }

  async created(annexeDto: AnnexeEntity) {
    return await this.AnnexeRepository.save(annexeDto);
  }

  async updated(annexeId: number, annexeDto: AnnexeEntity) {
    return await this.AnnexeRepository.update(annexeId, annexeDto);
  }

  async deleted(annexeDto: AnnexeEntity) {
    return await this.AnnexeRepository.remove(annexeDto);
  }
}
