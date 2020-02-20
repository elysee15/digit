import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PieceJointeQuestionEntity } from "./piece-jointe-question.entity";

@Injectable()
@EntityRepository(PieceJointeQuestionEntity)
export class PieceJointeQuestionRepository extends Repository<
  PieceJointeQuestionEntity
> {
  constructor(
    @InjectRepository(PieceJointeQuestionEntity)
    private readonly pieceJointeQuestionRepository: Repository<
      PieceJointeQuestionEntity
    >
  ) {
    super();
  }

  async findAll() {
    return await this.pieceJointeQuestionRepository.find();
  }

  async findById(pieceId: number) {
    return await this.pieceJointeQuestionRepository.findOne(pieceId);
  }

  async created(pieceDto: PieceJointeQuestionEntity) {
    return await this.pieceJointeQuestionRepository.save(pieceDto);
  }

  async updated(pieceId: number, pieceDto: PieceJointeQuestionEntity) {
    return await this.pieceJointeQuestionRepository.update(pieceId, pieceDto);
  }

  async deleted(pieceDto: PieceJointeQuestionEntity) {
    return await this.pieceJointeQuestionRepository.remove(pieceDto);
  }
}
