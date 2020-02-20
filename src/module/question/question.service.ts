import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { QuestionEntity } from "./question.entity";

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async getAll() {
    return await this.questionRepository.findAll();
  }

  async getById(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    if (question) {
      return question;
    }
    throw new NotFoundException("La question n'existe pas");
  }

  async creating(data: QuestionEntity) {
    return await this.questionRepository.created(data);
  }

  async updating(questionId: number, data: QuestionEntity) {
    const question = await this.questionRepository.findById(questionId);
    if (question) {
      await this.questionRepository.updated(questionId, data);
      return question;
    }
    throw new NotFoundException(
      "Modification impossible car question inexistante"
    );
  }

  async deleting(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    if (question) {
      try {
        return this.questionRepository.deleted(question);
      } catch (e) {
        throw new InternalServerErrorException(
          "Impossible de supprimer car cette question est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car question inexistante"
    );
  }
}
