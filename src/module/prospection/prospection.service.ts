import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProspectionRepository } from "./prospection.repository";
import { ProspectionEntity } from "./prospection.entity";

@Injectable()
export class ProspectionService {
  constructor(private readonly prospectionRepository: ProspectionRepository) {}

  async getAll() {
    return await this.prospectionRepository.findAll();
  }

  async getById(prospectionId: number) {
    const prospection = await this.prospectionRepository.findById(
      prospectionId
    );
    if (prospection) {
      return prospection;
    }
    return null;
  }

  async creating(prospectionDto: ProspectionEntity) {
    return await this.prospectionRepository.created(prospectionDto);
  }

  async updating(prospectionId: number, prospectionDto: ProspectionEntity) {
    const prospection = await this.prospectionRepository.findById(
      prospectionId
    );
    if (prospection) {
      await this.prospectionRepository.updated(prospectionId, prospectionDto);
      return prospection;
    }
    return null;
  }

  async deleting(prospectionId: number) {
    const prospection = await this.prospectionRepository.findById(
      prospectionId
    );
    if (prospection) {
      try {
        return this.prospectionRepository.deleted(prospection);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car cette prospection est en cours d'utilisation"
        );
      }
    }
    return null;
  }

  async findCount() {
    return await this.prospectionRepository.countProspection();
  }
}
