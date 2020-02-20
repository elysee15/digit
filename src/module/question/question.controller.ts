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
import { JsonView } from "../../helpers/utils/JsonView";
import { QuestionService } from "./question.service";
import { QuestionEntity } from "./question.entity";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  public async getAllQuestion() {
    const question = await this.questionService.getAll();
    if (Object.keys(question).length === 0) {
      return JsonView.dataResponse(question, "Object empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      question,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getQuestionById(@Param("id", ParseIntPipe) id: number) {
    const question = await this.questionService.getById(id);
    return JsonView.dataResponse(
      question,
      "Object was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postQuestion(@Body(new ValidationPipe()) data: QuestionEntity) {
    const question = await this.questionService.creating(data);
    if (question) {
      return JsonView.dataResponse(
        question,
        "La question a été enregistrée avec succès",
        HttpStatus.CREATED
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
    @Body(new ValidationPipe()) data: QuestionEntity
  ) {
    const question = await this.questionService.updating(questionId, data);
    if (question) {
      return JsonView.dataResponse(
        question,
        "La question à été modifiée avec succès",
        HttpStatus.OK
      );
    }
  }

  @Delete(":questionId")
  public async deleteQuestion(
    @Param("questionId", ParseIntPipe) questionId: number
  ) {
    const question = await this.questionService.deleting(questionId);
    return JsonView.dataResponse(
      question,
      "Question was successfully deleted",
      HttpStatus.OK
    );
  }
}
