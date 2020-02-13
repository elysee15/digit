import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
    constructor(
        private readonly questionRepository: QuestionRepository
    ){}

    async getAll(){
        return await this.questionRepository.findAll();
    }

    async getById(questionId){
        const question = await this.questionRepository.findById(questionId);
        if (question){
            return question;
        }
        return null;
    }

    async creating(questionDto){
        return await this.questionRepository.created(questionDto);
    }

    async updating(questionId, questionDto){
        const question = await this.questionRepository.findById(questionId);
        if (question){
            await this.questionRepository.updated(questionId, questionDto);
            return question;
        }
        return null;
    }

    async deleting(questionId){
        const question = await this.questionRepository.findById(questionId);
        if (question){
            try {
                return this.questionRepository.deleted(question);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car cette question est en cours d'utilisation");
            }
        }
        return null;
    }
}
