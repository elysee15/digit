import { Module } from "@nestjs/common";
import { OffreDeMissionController } from "./offre-de-mission.controller";
import { OffreDeMissionService } from "./offre-de-mission.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OffreDeMissionEntity } from "./offre-de-mission.entity";
import { OffreDeMissionRepository } from "./offre-de-mission.repository";

@Module({
  imports: [TypeOrmModule.forFeature([OffreDeMissionEntity])],
  controllers: [OffreDeMissionController],
  providers: [OffreDeMissionService, OffreDeMissionRepository]
})
export class OffreDeMissionModule {}
