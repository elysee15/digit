import { Module } from '@nestjs/common';
import { CategorieController } from './categorie.controller';
import { CategorieService } from './categorie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieEntity } from './categorie.entity';
import { CategorieRepository } from './categorie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategorieEntity])],
  controllers: [CategorieController],
  providers: [CategorieService, CategorieRepository]
})
export class CategorieModule {}
