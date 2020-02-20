import { Module } from "@nestjs/common";
import { BesoinController } from "./besoin.controller";
import { BesoinService } from "./besoin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BesoinEntity } from "./besoin.entity";
import { BesoinRepository } from "./besoin.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BesoinEntity])],
  controllers: [BesoinController],
  providers: [BesoinService, BesoinRepository]
})
export class BesoinModule {}
