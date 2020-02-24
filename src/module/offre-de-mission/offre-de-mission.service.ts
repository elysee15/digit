import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { OffreDeMissionRepository } from "./offre-de-mission.repository";
import { OffreDeMissionEntity } from "./offre-de-mission.entity";

@Injectable()
export class OffreDeMissionService {
  constructor(
    private readonly offreDeMissionRepository: OffreDeMissionRepository
  ) {}

  async getAll() {
    return await this.offreDeMissionRepository.findAll();
  }

  async getById(id) {
    const offre = await this.offreDeMissionRepository.findById(id);
    if (offre) {
      return offre;
    }
    throw new NotFoundException("Cette offre de mission n'existe pas");
  }

  async creating(data: OffreDeMissionEntity) {
    return await this.offreDeMissionRepository.created(data);
  }

  async updating(id: number, data: OffreDeMissionEntity) {
    const offre = await this.offreDeMissionRepository.findById(id);
    if (offre) {
      await this.offreDeMissionRepository.updated(id, data);
      return offre;
    }
    throw new NotFoundException(
      `Modification impossible car offre de mission ${id} inexistante`
    );
  }

  async deleting(id) {
    const offre = await this.offreDeMissionRepository.findById(id);
    if (offre) {
      try {
        return await this.offreDeMissionRepository.deleted(offre);
      } catch (e) {
        throw new ConflictException(
          "Impossible de supprimer car cette offre est en cours d'utilisation",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car offre de mission inexistante"
    );
  }

  async findCount() {
    return await this.offreDeMissionRepository.countOffre();
  }
}
