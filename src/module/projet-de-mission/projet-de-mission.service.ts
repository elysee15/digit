import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProjetDeMissionRepository } from './projet-de-mission.repository';

@Injectable()
export class ProjetDeMissionService {
    constructor(
        private readonly projetDeMissionRepository: ProjetDeMissionRepository
    ){}

    async getAll(){
        return await this.projetDeMissionRepository.findAll();
    }

    async getById(id){
        const projet = await this.projetDeMissionRepository.findById(id);
        if (projet){
            return projet;
        }
        return null;
    }

    async creating(projetDto){
        return await this.projetDeMissionRepository.created(projetDto);
    }

    async updating(id, projetDto){
        const projet = await this.projetDeMissionRepository.findById(id);
        if (projet){
            await this.projetDeMissionRepository.updated(id, projetDto);
            return projetDto;
        }
        return null;
    }

    async deleting(id){
        const projet = await this.projetDeMissionRepository.findById(id);
        if (projet){
            try {
                return this.projetDeMissionRepository.deleted(projet);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car ce projet est en cours d'utilisation");
            }
        }
        return null;
    }

    async findCount(){
        return await this.projetDeMissionRepository.countProjet();
    }
}
