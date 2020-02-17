import { Injectable, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AnnexeRepository } from './annexe.repository';

@Injectable()
export class AnnexeService {
    constructor(
        private readonly annexeRepository: AnnexeRepository
    ){}

    async getAll(){
        return await this.annexeRepository.findAll();
    }

    async getById(id:number){
        const annexe = await this.annexeRepository.findById(id);
        if (annexe){
            return annexe;
        }
        return null;
    }

    async creating(annexeDto){
        return await this.annexeRepository.created(annexeDto);
    }

    async updating(annexeId, annexeDto){
        const annexe = await this.annexeRepository.findById(annexeId);
        if (annexe){
            await this.annexeRepository.updated(annexeId, annexeDto);
            return annexe;
        }
        return null;
    }

    async deleting(id){
        const annexe = await this.annexeRepository.findById(id);
        if (annexe){
            try {
                return this.annexeRepository.deleted(annexe);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car cet annexe est en cours d'utilisation");
            }
        }
        return null;
    }
}
