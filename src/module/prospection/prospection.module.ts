import { Module } from '@nestjs/common';
import { ProspectionController } from './prospection.controller';
import { ProspectionService } from './prospection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectionEntity } from './prospection.entity';
import { ProspectionRepository } from './prospection.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProspectionEntity])],
  controllers: [ProspectionController],
  providers: [ProspectionService, ProspectionRepository]
})
export class ProspectionModule {}
