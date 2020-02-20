import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProjetDeMissionRepository } from "./projet-de-mission.repository";
import { ProjetDeMissionEntity } from "./projet-de-mission.entity";

@Injectable()
export class ProjetDeMissionService {
  constructor(
    private readonly projetDeMissionRepository: ProjetDeMissionRepository
  ) {}

  async getAll() {
    return await this.projetDeMissionRepository.findAll();
  }

  async getById(id: number) {
    const projet = await this.projetDeMissionRepository.findById(id);
    if (projet) {
      return projet;
    }
    throw new NotFoundException(
      "Ce projet de mission n'existe pas"
    );
  }

  async creating(data: ProjetDeMissionEntity) {
    return await this.projetDeMissionRepository.created(data);
  }

  async updating(id: number, data: ProjetDeMissionEntity) {
    const projet = await this.projetDeMissionRepository.findById(id);
    if (projet) {
      await this.projetDeMissionRepository.updated(id, data);
      return projet;
    }
    throw new NotFoundException(
      "Modification impossible car projet de mission inexistant"
    );  }

  async deleting(id: number) {
    const projet = await this.projetDeMissionRepository.findById(id);
    if (projet) {
      try {
        return this.projetDeMissionRepository.deleted(projet);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car ce projet est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car projet de mission inexistant"
    );  
  }

  async findCount() {
    return await this.projetDeMissionRepository.countProjet();
  }
}
