import { Module } from '@nestjs/common';
import { PlaningController } from './planing.controller';
import { PlaningService } from './planing.service';
import { PlaningEntity } from './planing.entity';
import { PlaningRepository } from './planing.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlaningEntity])],
  controllers: [PlaningController],
  providers: [PlaningService, PlaningRepository]
})
export class PlaningModule {}