import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QuestionnaireRepository } from './questionnaire.repository';

@Injectable()
export class QuestionnaireService {
    constructor(
        private readonly questionnaireRepository: QuestionnaireRepository
    ){}

    async getAll(){
        return await this.questionnaireRepository.findAll();
    }

    async getById(questionnaireId){
        const questionnaire = await this.questionnaireRepository.findById(questionnaireId);
        if (questionnaire){
            return questionnaire;
        }
        return null;
    }

    async creating(questionnaireDto){
        return await this.questionnaireRepository.created(questionnaireDto);
    }

    async updating(questionnaireId, questionnaireDto){
        const questionnaire = await this.questionnaireRepository.findById(questionnaireId);
        if (questionnaire){
            await this.questionnaireRepository.updated(questionnaireId, questionnaireDto);
            return questionnaire;
        }
        return null;
    }

    async deleting(questionnaireId){
        const questionnaire = await this.questionnaireRepository.findById(questionnaireId);
        if (questionnaire){
            try {
                return this.questionnaireRepository.deleted(questionnaire);
            } catch(e){
                throw new InternalServerErrorException("Impossible de supprimer car ce questionnaire est en cours d'utilisation");
            }
        }
        return null;
    }
}
