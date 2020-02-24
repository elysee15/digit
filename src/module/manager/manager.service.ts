import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { ManagerRepository } from "./manager.repository";
import { ManagerEntity } from "./manager.entity";

@Injectable()
export class ManagerService {
  constructor(private readonly managerRepository: ManagerRepository) {}

  async getAll() {
    return await this.managerRepository.findAll();
  }

  async getById(managerId) {
    const manager = await this.managerRepository.findById(managerId);
    if (manager) {
      return manager;
    }
    throw new NotFoundException("Manager was successfully found");
  }

  async creating(data: ManagerEntity) {
    return await this.managerRepository.created(data);
  }

  async updating(managerId: number, data: ManagerEntity) {
    const manager = await this.managerRepository.findById(managerId);
    if (manager) {
      await this.managerRepository.updated(managerId, data);
      return manager;
    }
    throw new NotFoundException(
      "Impossible to update because manager does not found"
    );
  }

  async deleting(managerId: number) {
    const manager = await this.managerRepository.findById(managerId);
    if (manager) {
      try {
        return await this.managerRepository.deleted(manager);
      } catch (e) {
        throw new ConflictException(
          "Impossible to delete because manager is in use",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException(
      "Impossible to delete because manager doesn't exist"
    );
  }
}
