import { Module } from '@nestjs/common';
import { AnnexeController } from './annexe.controller';
import { AnnexeService } from './annexe.service';
import {AnnexeEntity } from './annexe.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnexeRepository } from './annexe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnnexeEntity])],
  controllers: [AnnexeController],
  providers: [AnnexeService, AnnexeRepository],
  exports: [AnnexeRepository]
})
export class AnnexeModule {}
