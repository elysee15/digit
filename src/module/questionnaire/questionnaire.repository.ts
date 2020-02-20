import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionnaireEntity } from "./questionnaire.entity";

@Injectable()
@EntityRepository(QuestionnaireEntity)
export class QuestionnaireRepository extends Repository<QuestionnaireEntity> {
  constructor(
    @InjectRepository(QuestionnaireEntity)
    private readonly questionnaireRepository: Repository<QuestionnaireEntity>
  ) {
    super();
  }

  async findAll() {
    return await this.questionnaireRepository.find();
  }

  async findById(questionnaireId: number) {
    return await this.questionnaireRepository.findOne(questionnaireId);
  }

  async created(questionnaireDto: QuestionnaireEntity) {
    return await this.questionnaireRepository.save(questionnaireDto);
  }

  async updated(
    questionnaireId: number,
    questionnaireDto: QuestionnaireEntity
  ) {
    return await this.questionnaireRepository.update(
      questionnaireId,
      questionnaireDto
    );
  }

  async deleted(questionnaireDto: QuestionnaireEntity) {
    return await this.questionnaireRepository.remove(questionnaireDto);
  }
}
