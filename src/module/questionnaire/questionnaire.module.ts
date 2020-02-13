import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireRepository } from './questionnaire.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireRepository]
})
export class QuestionnaireModule {}
