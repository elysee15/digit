import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerRepository } from './manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository]
})
export class ManagerModule {}
