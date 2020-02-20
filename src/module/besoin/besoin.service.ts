import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { BesoinRepository } from "./besoin.repository";

@Injectable()
export class BesoinService {
  constructor(private readonly besoinRepository: BesoinRepository) {}

  async getAll() {
    return await this.besoinRepository.findAll();
  }

  async getById(besoinId) {
    const besoin = await this.besoinRepository.findById(besoinId);
    if (besoin) {
      return besoin;
    }
    throw new NotFoundException("Object does not exist");
  }

  async findCount() {
    return this.besoinRepository.countBesoin();
  }

  async creating(data) {
    return await this.besoinRepository.created(data);
  }

  async updating(besoinId, data) {
    const besoin = await this.besoinRepository.findById(besoinId);
    if (besoin) {
      await this.besoinRepository.updated(besoinId, data);
      return besoin;
    }
    throw new NotFoundException("Impossible to update, object does not exist");
  }

  async deleting(besoinId) {
    const besoin = await this.besoinRepository.findById(besoinId);
    if (besoin) {
      try {
        return this.besoinRepository.deleted(besoin);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car ce besoin est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException("Impossible to delete, object does not exist");
  }
}
