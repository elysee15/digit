import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Body,
  Post,
  NotFoundException,
  HttpException,
  Delete,
  ParseIntPipe,
  ValidationPipe
} from "@nestjs/common";
import { JsonView } from "src/helpers/utils/JsonView";
import { QuestionnaireService } from "./questionnaire.service";
import { QuestionnaireEntity } from "./questionnaire.entity";

@Controller("questionnaire")
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  public async getAllQuestionnaire() {
    const questionnaire = await this.questionnaireService.getAll();
    if (Object.keys(questionnaire).length === 0) {
      return JsonView.dataResponse(
        questionnaire,
        "Object empty",
        HttpStatus.OK
      );
    }
    return JsonView.dataResponse(
      questionnaire,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getQuestionnaireById(@Param("id", ParseIntPipe) id: number) {
    const questionnaire = await this.questionnaireService.getById(id);
    if (questionnaire) {
      return JsonView.dataResponse(
        questionnaire,
        "Object was successfully found",
        HttpStatus.OK
      );
    }
  }

  @Post()
  public async postQuestionnaire(
    @Body(new ValidationPipe()) data: QuestionnaireEntity
  ) {
    const questionnaire = await this.questionnaireService.creating(data);
    if (questionnaire) {
      return JsonView.dataResponse(
        questionnaire,
        "Le questionnaire a été enregistré avec succès",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":questionnaireId")
  public async updateQuestionnaire(
    @Param("questionnaireId", ParseIntPipe) questionnaireId: number,
    @Body(new ValidationPipe()) data: QuestionnaireEntity
  ) {
    const questionnaire = await this.questionnaireService.updating(
      questionnaireId,
      data
    );
    return JsonView.dataResponse(
      questionnaire,
      "Le questionnaire à été modifié avec succès",
      HttpStatus.OK
    );
  }

  @Delete(":questionnaireId")
  public async deleteQuestionnaire(
    @Param("questionnaireId", ParseIntPipe) questionnaireId: number
  ) {
    const question = await this.questionnaireService.deleting(questionnaireId);
    return JsonView.dataResponse(
      question,
      "Questionnary was successfully deleted"
    );
  }
}
