import { Module } from "@nestjs/common";
import { PieceJointeQuestionController } from "./piece-jointe-question.controller";
import { PieceJointeQuestionService } from "./piece-jointe-question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PieceJointeQuestionRepository } from "./piece-jointe-question.repository";
import { PieceJointeQuestionEntity } from "./piece-jointe-question.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PieceJointeQuestionEntity])],
  controllers: [PieceJointeQuestionController],
  providers: [PieceJointeQuestionService, PieceJointeQuestionRepository]
})
export class PieceJointeQuestionModule {}
