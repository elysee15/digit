import { Module } from '@nestjs/common';
import { AnnexeController } from './annexe.controller';
import { AnnexeService } from './annexe.service';
import {AnnexeEntity } from './annexe.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AnnexeEntity])],
  controllers: [AnnexeController],
  providers: [AnnexeService]
})
export class AnnexeModule {}
