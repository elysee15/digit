import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionEntity } from "./question.entity";


@Injectable()
@EntityRepository(QuestionEntity)

export class QuestionRepository extends Repository<QuestionEntity>{
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>
    ){
        super();
    }

    async findAll(){
        return await this.questionRepository.find();
    }

    async findById(questionId: number){
        return await this.questionRepository.findOne(questionId);
    }

    async created(questionDto: QuestionEntity){
        return await this.questionRepository.save(questionDto);
    }

    async updated(questionId: number, questionDto: QuestionEntity){
        return await this.questionRepository.update(questionId, questionDto);
    }

    async deleted(questionDto: QuestionEntity){
        return await this.questionRepository.remove(questionDto)
    }
}