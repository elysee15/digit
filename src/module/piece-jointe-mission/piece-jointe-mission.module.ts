import { Module } from '@nestjs/common';
import { PieceJointeMissionController } from './piece-jointe-mission.controller';
import { PieceJointeMissionService } from './piece-jointe-mission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PieceJointeMissionEntity } from './piece-jointe-mission.entity';
import { PieceJointeMissionRepository } from './piece-jointe-mission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PieceJointeMissionEntity])],
  controllers: [PieceJointeMissionController],
  providers: [PieceJointeMissionService, PieceJointeMissionRepository]
})
export class PieceJointeMissionModule {}
