import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProspectRepository } from "./prospect.repository";
import { ProspectEntity } from "./prospect.entity";

@Injectable()
export class ProspectService {
  constructor(private readonly prospectRepository: ProspectRepository) {}

  async getAll() {
    return await this.prospectRepository.findAll();
  }

  async getById(prospectId: number) {
    const prospect = await this.prospectRepository.findById(prospectId);
    if (prospect) {
      return prospect;
    }
    throw new NotFoundException("Le prospect n'existe pas");  
  }

  async creating(prospectDto: ProspectEntity) {
    return await this.prospectRepository.created(prospectDto);
  }

  async updating(prospectId: number, data: ProspectEntity) {
    const prospect = await this.prospectRepository.findById(prospectId);
    if (prospect) {
      await this.prospectRepository.updated(prospectId, data);
      return prospect;
    }
    throw new NotFoundException(
      "Modification impossible car prospect inexistant"
    );  }

  async deleting(prospectId: number) {
    const prospect = await this.prospectRepository.findById(prospectId);
    if (prospect) {
      try {
        return this.prospectRepository.deleted(prospect);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car ce prospect est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car prospect inexistant"
    );  }

  public async countProspect() {
    return await this.prospectRepository.countProspect();
  }
}
