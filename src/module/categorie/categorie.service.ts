import { Injectable, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CategorieRepository } from './categorie.repository';

@Injectable()
export class CategorieService {
    constructor(
        private readonly categoryRepository: CategorieRepository
    ){}

    async getAll(){
        return await this.categoryRepository.findAll();
    }

    async getById(categorieId){
        const categorie = await this.categoryRepository.findById(categorieId);
        if (categorie){
            return categorie;
        }
        return null;
    }

    async creating(categorieDto){
        return await this.categoryRepository.created(categorieDto);
    }

    async updating(categorieId, categorieDto){
        const categorie = await this.categoryRepository.findById(categorieId);
        if (categorie){
            await this.categoryRepository.updated(categorieId, categorieDto);
            return categorie;
        }
        return null;
    }

    async deleting(categorieId){
        const categorie = await this.categoryRepository.findById(categorieId);
        if (categorie){
            try {
                return this.categoryRepository.deleted(categorie);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car cette categorie est en cours d'utilisation");
            }
        }
        return null;
    }
}
