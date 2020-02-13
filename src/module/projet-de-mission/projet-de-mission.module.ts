import { Module } from '@nestjs/common';
import { ProjetDeMissionController } from './projet-de-mission.controller';
import { ProjetDeMissionService } from './projet-de-mission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetDeMissionEntity } from './projet-de-mission.entity';
import { ProjetDeMissionRepository } from './projet-de-mission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjetDeMissionEntity])],
  controllers: [ProjetDeMissionController],
  providers: [ProjetDeMissionService, ProjetDeMissionRepository]
})
export class ProjetDeMissionModule {}
