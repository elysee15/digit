import {
  Injectable,
  HttpException,
  NotFoundException,
  InternalServerErrorException
} from "@nestjs/common";
import { FamilleDeMissionRepository } from "./famille-de-mission.repository";
import { FamilleDeMissionEntity } from "./famille-de-mission.entity";

@Injectable()
export class FamilleDeMissionService {
  constructor(
    private readonly familleDeMissionRepository: FamilleDeMissionRepository
  ) {}

  async getAll() {
    return await this.familleDeMissionRepository.findAll();
  }

  async getById(id: number) {
    const famille = await this.familleDeMissionRepository.findById(id);
    if (famille) {
      return famille;
    }
    throw new NotFoundException("Cette famille de mission n'existe pas");
  }

  async creating(data: FamilleDeMissionEntity) {
    return await this.familleDeMissionRepository.created(data);
  }

  async updating(id: number, data: FamilleDeMissionEntity) {
    const famille = await this.familleDeMissionRepository.findById(id);
    if (famille) {
      await this.familleDeMissionRepository.updated(id, data);
      return famille;
    }
    throw new NotFoundException(
      "Modification impossible car famille de mission inexistante"
    );
  }

  async deleting(id) {
    const famille = await this.familleDeMissionRepository.findById(id);
    if (famille) {
      try {
        return this.familleDeMissionRepository.deleted(famille);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car cette famille de mission est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car famille de mission inexistante"
    );
  }
}
