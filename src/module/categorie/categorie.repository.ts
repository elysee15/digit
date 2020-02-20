import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CategorieEntity } from "./categorie.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(CategorieEntity)
export class CategorieRepository extends Repository<CategorieEntity> {
  constructor(
    @InjectRepository(CategorieEntity)
    private readonly categorieRepository: Repository<CategorieEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.categorieRepository.find();
  }

  async findById(categorieId: number) {
    return await this.categorieRepository.findOne(categorieId);
  }

  async created(categorieDto: CategorieEntity) {
    return await this.categorieRepository.save(categorieDto);
  }

  async updated(categorieId: number, categorieDto: CategorieEntity) {
    return await this.categorieRepository.update(categorieId, categorieDto);
  }

  async deleted(categorieDto: CategorieEntity) {
    return await this.categorieRepository.remove(categorieDto);
  }
}
