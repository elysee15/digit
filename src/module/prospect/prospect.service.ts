import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
    return null;
  }

  async creating(prospectDto: ProspectEntity) {
    return await this.prospectRepository.created(prospectDto);
  }

  async updating(prospectId: number, prospectDto: ProspectEntity) {
    const prospect = await this.prospectRepository.findById(prospectId);
    if (prospect) {
      await this.prospectRepository.updated(prospectId, prospectDto);
      return prospect;
    }
    return null;
  }

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
    return null;
  }

  public async countProspect() {
    return await this.prospectRepository.countProspect();
  }
}
