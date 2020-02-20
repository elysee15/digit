import {
  Injectable,
  HttpException,
  NotFoundException,
  InternalServerErrorException
} from "@nestjs/common";
import { CategorieRepository } from "./categorie.repository";
import { CategorieEntity } from "./categorie.entity";

@Injectable()
export class CategorieService {
  constructor(private readonly categoryRepository: CategorieRepository) {}

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async getById(categorieId: number) {
    const categorie = await this.categoryRepository.findById(categorieId);
    if (categorie) {
      return categorie;
    }
    throw new NotFoundException("Categorie not found");
  }

  async creating(data: CategorieEntity) {
    return await this.categoryRepository.created(data);
  }

  async updating(categorieId: number, data: CategorieEntity) {
    const categorie = await this.categoryRepository.findById(categorieId);
    if (categorie) {
      this.categoryRepository.updated(categorieId, data);
      return categorie;
    }
    throw new NotFoundException(
      "Modification impossible car catégorie inexistante"
    );
  }

  async deleting(categorieId) {
    const categorie = await this.categoryRepository.findById(categorieId);
    if (categorie) {
      try {
        return this.categoryRepository.deleted(categorie);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car cette categorie est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car catégorie inexistante"
    );
  }
}
