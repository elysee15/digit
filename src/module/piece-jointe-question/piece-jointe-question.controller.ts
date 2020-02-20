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
  ValidationPipe
} from "@nestjs/common";
import { JsonView } from "src/helpers/utils/JsonView";
import { PieceJointeQuestionService } from "./piece-jointe-question.service";
import { PieceJointeQuestionEntity } from "./piece-jointe-question.entity";

@Controller("pieces-jointes-question")
export class PieceJointeQuestionController {
  constructor(
    private readonly pieceJointeQuestionService: PieceJointeQuestionService
  ) {}

  @Get()
  public async getAllPiece() {
    const piece = await this.pieceJointeQuestionService.getAll();
    if (Object.keys(piece).length === 0) {
      return JsonView.dataResponse(piece, "Objects empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      piece,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getPieceById(@Param("id") id: number) {
    const piece = await this.pieceJointeQuestionService.getById(id);
    return JsonView.dataResponse(
      piece,
      "Object was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postPieceJointeMission(
    @Body(new ValidationPipe()) data: PieceJointeQuestionEntity
  ) {
    const piece = await this.pieceJointeQuestionService.creating(data);
    if (piece) {
      return JsonView.dataResponse(
        piece,
        "La pièce jointe question a été enregistrée avec succès",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":id")
  public async updatePieceJointeMission(
    @Param("id") id: number,
    @Body(new ValidationPipe()) data: PieceJointeQuestionEntity
  ) {
    const piece = await this.pieceJointeQuestionService.updating(id, data);
    return JsonView.dataResponse(
      piece,
      "La piece jointe question à été modifiée avec succès",
      HttpStatus.OK
    );
  }

  @Delete(":id")
  public async deletePieceJointeQuestion(@Param("id") id: number) {
    const piece = await this.pieceJointeQuestionService.deleting(id);
    return JsonView.dataResponse(
      piece,
      "La pièce jointe question a été supprimé avec succès"
    );
  }
}
