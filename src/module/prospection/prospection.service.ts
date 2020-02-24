import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
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
    throw new NotFoundException(
      `La prospection avec l'id ${prospectionId} n'existe pas`
    );
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
    throw new NotFoundException(
      `Modification impossible, la prospection avec l'id ${prospectionId} n'existe pas`
    );
  }

  async deleting(prospectionId: number) {
    const prospection = await this.prospectionRepository.findById(
      prospectionId
    );
    if (prospection) {
      try {
        return await this.prospectionRepository.deleted(prospection);
      } catch (e) {
        throw new ConflictException(
          "Impossible de supprimer car cette prospection est en cours d'utilisation",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException(
      `Suppression impossible, la prospection avec l'id ${prospectionId} n'existe pas`
    );
  }

  async findCount() {
    return await this.prospectionRepository.countProspection();
  }
}
