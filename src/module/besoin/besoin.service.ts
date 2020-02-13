import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BesoinRepository } from './besoin.repository';

@Injectable()
export class BesoinService {
    constructor(
        private readonly besoinRepository: BesoinRepository
    ){}

    async getAll(){
        return await this.besoinRepository.findAll();
    }

    async getById(besoinId){
        const besoin = await this.besoinRepository.findById(besoinId);
        if (besoin){
            return besoin;
        }
        return null;
    }

    async findCount(){
        return this.besoinRepository.countBesoin();
    }

    async creating(besoinDto){
        return await this.besoinRepository.created(besoinDto);
    }

    async updating(besoinId, besoinDto){
        const besoin = await this.besoinRepository.findById(besoinId);
        if (besoin){
            await this.besoinRepository.updated(besoinId, besoinDto);
            return besoin;
        }
        return null;
    }

    async deleting(besoinId){
        const besoin = await this.besoinRepository.findById(besoinId);
        if (besoin){
            try {
                return this.besoinRepository.deleted(besoin);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car ce besoin est en cours d'utilisation");
            }
        }
        return null;
    }
}
