import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProspectionEntity } from "./prospection.entity";

@Injectable()
@EntityRepository(ProspectionEntity)
export class ProspectionRepository extends Repository<ProspectionEntity> {
  constructor(
    @InjectRepository(ProspectionEntity)
    private readonly prospectionRepository: Repository<ProspectionEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.prospectionRepository.find();
  }

  async findById(prospectionId: number) {
    return await this.prospectionRepository.findOne(prospectionId);
  }

  async created(prospectionDto: ProspectionEntity) {
    return await this.prospectionRepository.save(prospectionDto);
  }

  async updated(prospectionId: number, prospectionDto: ProspectionEntity) {
    return await this.prospectionRepository.update(
      prospectionId,
      prospectionDto
    );
  }

  async deleted(prospectionDto: ProspectionEntity) {
    return await this.prospectionRepository.remove(prospectionDto);
  }

  // get prospection total
  async countProspection() {
    return await this.prospectionRepository
      .createQueryBuilder("ProspectionEntity")
      .select("SUM(prospection.codeProspection)", "sum")
      .getCount();
  }

  // liste des prospections en cours
  // async prospectionEnCours() {
  //     return  await this.prospectionRepository.createQueryBuilder('ProspectionEntity')
  //
  // }
}
