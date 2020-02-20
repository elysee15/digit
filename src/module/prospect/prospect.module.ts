import { Module } from "@nestjs/common";
import { ProspectController } from "./prospect.controller";
import { ProspectService } from "./prospect.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProspectRepository } from "./prospect.repository";
import { ProspectEntity } from "./prospect.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProspectEntity])],
  controllers: [ProspectController],
  providers: [ProspectService, ProspectRepository]
})
export class ProspectModule {}
