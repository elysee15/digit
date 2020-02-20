import { Module } from "@nestjs/common";
import { FamilleDeMissionController } from "./famille-de-mission.controller";
import { FamilleDeMissionService } from "./famille-de-mission.service";
import { FamilleDeMissionEntity } from "./famille-de-mission.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FamilleDeMissionRepository } from "./famille-de-mission.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FamilleDeMissionEntity])],
  controllers: [FamilleDeMissionController],
  providers: [FamilleDeMissionService, FamilleDeMissionRepository]
})
export class FamilleDeMissionModule {}
