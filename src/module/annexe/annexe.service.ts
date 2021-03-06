import {
  Injectable,
  HttpException,
  NotFoundException,
  ConflictException,
  HttpStatus
} from "@nestjs/common";
import { AnnexeRepository } from "./annexe.repository";
import { AnnexeEntity } from "./annexe.entity";

@Injectable()
export class AnnexeService {
  constructor(private readonly annexeRepository: AnnexeRepository) {}

  async getAll() {
     return await this.annexeRepository.findAll();
  }

  async getById(id: number) {
    const annexe = await this.annexeRepository.findById(id);
    if (annexe) {
      return annexe;
    }
    throw new NotFoundException("Cet annexe n'existe pas");
  }

  async creating(annexe: AnnexeEntity) {
     return await this.annexeRepository.created(annexe);
  }

  async updating(annexeId: number, data: AnnexeEntity) {
    const annexe = await this.annexeRepository.findById(annexeId);
    if (annexe) {
      await this.annexeRepository.updated(annexeId, data);
      return annexe;
    }
    throw new NotFoundException(
      "Impossible to update because it does not exist"
    );
  }

  async deleting(id: number) {
    const annexe = await this.annexeRepository.findById(id);
    if (annexe) {
      try {
        return await this.annexeRepository.deleted(annexe);
      } catch (error) {
        throw new ConflictException(
          "Impossible de supprimer car cet annexe est en cours d'utilisation", // message
          "Foreign key constraint error" // error label
        );
      }
    }
    throw new NotFoundException(
      "impossible to delete because it does not exist"
    );
  }
}
