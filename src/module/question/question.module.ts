import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./question.entity";
import { QuestionRepository } from "./question.repository";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository]
})
export class QuestionModule {}
