import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { PieceJointeQuestionRepository } from "./piece-jointe-question.repository";
import { PieceJointeQuestionEntity } from "./piece-jointe-question.entity";

@Injectable()
export class PieceJointeQuestionService {
  constructor(
    private readonly pieceJointeQuestionRepository: PieceJointeQuestionRepository
  ) {}

  async getAll() {
    return await this.pieceJointeQuestionRepository.findAll();
  }

  async getById(pieceId: number) {
    const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
    if (piece) {
      return piece;
    }
    throw new NotFoundException("Object doesn't exist");
  }

  async creating(data: PieceJointeQuestionEntity) {
    return await this.pieceJointeQuestionRepository.created(data);
  }

  async updating(pieceId: number, data: PieceJointeQuestionEntity) {
    const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
    if (piece) {
      await this.pieceJointeQuestionRepository.updated(pieceId, data);
      return piece;
    }
    throw new NotFoundException("La piece jointe n'existe pas");
  }

  async deleting(pieceId: number) {
    const piece = await this.pieceJointeQuestionRepository.findById(pieceId);
    if (piece) {
      try {
        return this.pieceJointeQuestionRepository.deleted(piece);
      } catch (e) {
        throw new InternalServerErrorException(
          "Suppression impossible car piece jointe est en cours d'utilisation"
        );
      }
    }
    throw new NotFoundException(
      "Suppression impossible car piece jointe inexistante"
    );
  }
}
