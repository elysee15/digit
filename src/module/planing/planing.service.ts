import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { PlaningRepository } from "./planing.repository";
import { PlaningEntity } from "./planing.entity";

@Injectable()
export class PlaningService {
  constructor(private readonly planingRepository: PlaningRepository) {}

  async getAll() {
    return await this.planingRepository.findAll();
  }

  async getById(planingId) {
    const planing = await this.planingRepository.findById(planingId);
    if (planing) {
      return planing;
    }
    throw new NotFoundException("Ce planing n'existe pas");
  }

  async creating(data: PlaningEntity) {
    return await this.planingRepository.created(data);
  }

  async updating(planingId: number, data: PlaningEntity) {
    const planing = await this.planingRepository.findById(planingId);
    if (planing) {
      await this.planingRepository.updated(planingId, data);
      return planing;
    }
    throw new NotFoundException(
      "Modification impossible car planing inexistant"
    );
  }

  async deleting(planingId: number) {
    const planing = await this.planingRepository.findById(planingId);
    if (planing) {
      try {
        return await this.planingRepository.deleted(planing);
      } catch (e) {
        throw new ConflictException(
          "Impossible de supprimer car ce planing est en cours d'utilisation",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car planing inexistant"
    );
  }
}
