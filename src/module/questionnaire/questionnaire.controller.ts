import {Controller, Get, HttpStatus, Param, Put, Body, Post, NotFoundException, HttpException, Delete, ParseIntPipe} from '@nestjs/common';
import { JsonView } from 'src/helpers/utils/JsonView';
import { QuestionnaireService } from './questionnaire.service'
import { QuestionnaireEntity } from './questionnaire.entity';

@Controller('questionnaire')
export class QuestionnaireController {
    constructor(
        private readonly questionnaireService : QuestionnaireService
    ){}

    @Get()
    public async getAllQuestionnaire(){
        const questionnaire = await this.questionnaireService.getAll();
        return JsonView.dataResponse(questionnaire, "Liste des questionnaires", HttpStatus.OK);
    }

    @Get(':id')
    public async getQuestionnaireById(@Param('id', ParseIntPipe) id: number){
        const questionnaire = await this.questionnaireService.getById(id);
        if (questionnaire){
            return JsonView.dataResponse(questionnaire, "", HttpStatus.OK);
        }
        throw new HttpException("La questionnaire n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postQuestionnaire(@Body() questionnaireDto: QuestionnaireEntity){
        const questionnaire = await this.questionnaireService.creating(questionnaireDto);
        if (questionnaire){
            return JsonView.dataResponse(questionnaire, "Le questionnaire a été enregistré avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':questionnaireId')
    public async updateQuestionnaire(@Param('questionnaireId', ParseIntPipe) questionnaireId: number, @Body() questionnaireDto: QuestionnaireEntity){
        const questionnaire = await this.questionnaireService.updating(questionnaireId, questionnaireDto);
        if (questionnaire){
            return JsonView.dataResponse(questionnaire, "Le questionnaire à été modifié avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car questionnaire inexistant", HttpStatus.NOT_FOUND);
    }

    @Delete(':questionnaireId')
    public async deleteQuestionnaire(@Param('questionnaireId', ParseIntPipe) questionnaireId: number){
        const question = await this.questionnaireService.deleting(questionnaireId);
        if (question){
            return "Questionnaire supprimé";
        }
        throw new HttpException("Suppression impossible car questionnaire inexistant", HttpStatus.NOT_FOUND);
    }

    
}
