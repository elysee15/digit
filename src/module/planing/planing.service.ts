import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PlaningRepository } from './planing.repository';

@Injectable()
export class PlaningService {
    constructor(
        private readonly planingRepository: PlaningRepository
    ){}

    async getAll(){
        return await this.planingRepository.findAll();
    }

    async getById(planingId){
        const planing = await this.planingRepository.findById(planingId);
        if (planing){
            return planing;
        }
        return null;
    }

    async creating(planingDto){
        return await this.planingRepository.created(planingDto);
    }

    async updating(planingId, planingDto){
        const planing = await this.planingRepository.findById(planingId);
        if (planing){
            await this.planingRepository.updated(planingId, planingDto);
            return planing;
        }
        return null;
    }

    async deleting(planingId){
        const planing = await this.planingRepository.findById(planingId);
        if (planing){
            try {
                return this.planingRepository.deleted(planing);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car ce planing est en cours d'utilisation");
            }
        }
        return null;
    }
}
