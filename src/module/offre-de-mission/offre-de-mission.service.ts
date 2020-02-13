import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OffreDeMissionRepository } from './offre-de-mission.repository';

@Injectable()
export class OffreDeMissionService {
    constructor(
        private readonly offreDeMissionRepository: OffreDeMissionRepository
    ){}

    async getAll(){
        return await this.offreDeMissionRepository.findAll();
    }

    async getById(id){
        const offre = await this.offreDeMissionRepository.findById(id);
        if (offre){
            return offre;
        }
        return null;
    }

    async creating(offreDto){
        return await this.offreDeMissionRepository.created(offreDto);
    }

    async updating(id, offreDto){
        const offre = await this.offreDeMissionRepository.findById(id);
        if (offre){
            await this.offreDeMissionRepository.updated(id,offreDto);
            return offreDto;
        }
        return null;
    }

    async deleting(id){
        const offre = await this.offreDeMissionRepository.findById(id);
        if (offre){
            try {
                return this.offreDeMissionRepository.deleted(offre);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car cette offre est en cours d'utilisation");
            }
        }
        return null;
    }

    async findCount(){
        return await this.offreDeMissionRepository.countOffre();
    }
}
