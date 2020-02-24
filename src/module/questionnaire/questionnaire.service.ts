import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { QuestionnaireRepository } from "./questionnaire.repository";
import { QuestionnaireEntity } from "./questionnaire.entity";

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository
  ) {}

  async getAll() {
    return await this.questionnaireRepository.findAll();
  }

  async getById(questionnaireId) {
    const questionnaire = await this.questionnaireRepository.findById(
      questionnaireId
    );
    if (questionnaire) {
      return questionnaire;
    }
    throw new NotFoundException("Le questionnaire n'existe pas");
  }

  async creating(data: QuestionnaireEntity) {
    return await this.questionnaireRepository.created(data);
  }

  async updating(questionnaireId: number, data: QuestionnaireEntity) {
    const questionnaire = await this.questionnaireRepository.findById(
      questionnaireId
    );
    if (questionnaire) {
      await this.questionnaireRepository.updated(questionnaireId, data);
      return questionnaire;
    }
    throw new NotFoundException(
      "Modification impossible car questionnaire inexistant"
    );
  }

  async deleting(questionnaireId) {
    const questionnaire = await this.questionnaireRepository.findById(
      questionnaireId
    );
    if (questionnaire) {
      try {
        return await this.questionnaireRepository.deleted(questionnaire);
      } catch (e) {
        throw new ConflictException(
          "Impossible de supprimer car ce questionnaire est en cours d'utilisation",
          "Foreign key constraint error"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car questionnaire inexistant"
    );
  }
}
