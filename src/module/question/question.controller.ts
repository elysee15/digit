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
  ParseIntPipe
} from "@nestjs/common";
import { JsonView } from "../../helpers/utils/JsonView";
import { QuestionService } from "./question.service";
import { QuestionEntity } from "./question.entity";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  public async getAllQuestion() {
    const question = await this.questionService.getAll();
    return JsonView.dataResponse(
      question,
      "Liste des questions",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getQuestionById(@Param("id", ParseIntPipe) id: number) {
    const question = await this.questionService.getById(id);
    if (question) {
      return JsonView.dataResponse(question, "", HttpStatus.OK);
    }
    throw new HttpException("La question n'existe pas", HttpStatus.NOT_FOUND);
  }

  @Post()
  public async postQuestion(@Body() questionDto) {
    const question = await this.questionService.creating(questionDto);
    if (question) {
      return JsonView.dataResponse(
        question,
        "La question a été enregistrée avec succès",
        HttpStatus.OK
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":questionId")
  public async updateQuestion(
    @Param("questionId", ParseIntPipe) questionId: number,
    @Body() questionDto: QuestionEntity
  ) {
    const question = await this.questionService.updating(
      questionId,
      questionDto
    );
    if (question) {
      return JsonView.dataResponse(
        question,
        "La question à été modifiée avec succès",
        HttpStatus.OK
      );
    }
    throw new HttpException(
      "Modification impossible car question inexistante",
      HttpStatus.NOT_FOUND
    );
  }

  @Delete(":questionId")
  public async deleteQuestion(
    @Param("questionId", ParseIntPipe) questionId: number
  ) {
    const question = await this.questionService.deleting(questionId);
    if (question) {
      return "Question supprimée";
    }
    throw new HttpException(
      "Suppression impossible car question inexistante",
      HttpStatus.NOT_FOUND
    );
  }
}
