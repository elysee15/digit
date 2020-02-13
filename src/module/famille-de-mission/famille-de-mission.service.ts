import { Injectable, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FamilleDeMissionRepository } from './famille-de-mission.repository';

@Injectable()
export class FamilleDeMissionService {
    constructor(
        private readonly familleDeMissionRepository: FamilleDeMissionRepository
    ){}

    async getAll(){
        return await this.familleDeMissionRepository.findAll();
    }

    async getById(id:number){
        const famille = await this.familleDeMissionRepository.findById(id);
        if (famille){
            return famille;
        }
        return null;
    }

    async creating(familleDto){
        return await this.familleDeMissionRepository.created(familleDto);
    }

    async updating(id, familleDto){
        const famille = await this.familleDeMissionRepository.findById(id);
        if (famille){
            await this.familleDeMissionRepository.updated(id, familleDto);
            return famille;
        }
        return null;
    }

    async deleting(id){
        const famille = await this.familleDeMissionRepository.findById(id);
        if (famille){
            try {
                return this.familleDeMissionRepository.deleted(famille);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car cette famille de mission est en cours d'utilisation");
            }
        }
        return null;
    }
}
