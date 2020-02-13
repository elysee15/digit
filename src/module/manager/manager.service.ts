import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ManagerRepository } from './manager.repository';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService {
    constructor(
        private readonly managerRepository: ManagerRepository,
    ){}

    async getAll(){
        return await this.managerRepository.findAll();
    }

    async getById(managerId){
        const manager = await this.managerRepository.findById(managerId);
        if (manager){
            return manager;
        }
        return null;
    }

    async creating(managerDto: ManagerEntity){
        return await this.managerRepository.created(managerDto);
    }

    async updating(managerId: number, managerDto: ManagerEntity){
        const manager = await this.managerRepository.findById(managerId);
        if (manager){
            await this.managerRepository.updated(managerId, managerDto);
            return manager;
        }
        return null;
    }

    async deleting(managerId: number){
        const manager = await this.managerRepository.findById(managerId)
        if (manager){
            try {
                return this.managerRepository.deleted(manager);
            } catch (e) {
                throw new InternalServerErrorException("Impossible de supprimer car cette categorie est en cours d'utilisation");
            }
        }
        return null;
    }


}
