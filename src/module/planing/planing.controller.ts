import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Body,
  Post,
  HttpException,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { PlaningService } from "./planing.service";
import { JsonView } from "../../helpers/utils/JsonView";
import { PlaningEntity } from "./planing.entity";

@Controller("planing")
export class PlaningController {
  constructor(private readonly planingService: PlaningService) {}

  @Get()
  public async getAllPlaning() {
    const planing = await this.planingService.getAll();
    if (Object.keys(planing).length === 0) {
      return JsonView.dataResponse(planing, "Objects empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      planing,
      "Planing was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getPlaningByID(@Param("id", ParseIntPipe) id: number) {
    const planing = await this.planingService.getById(id);
    if (planing) {
      return JsonView.dataResponse(planing, "", HttpStatus.OK);
    }
  }

  @Post()
  public async postPlaning(@Body(new ValidationPipe()) data: PlaningEntity) {
    const planing = await this.planingService.creating(data);
    if (planing) {
      return JsonView.dataResponse(
        planing,
        "Le planing a été enregistré avec succès",
        HttpStatus.OK
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":planingId")
  public async updatePlaning(
    @Param("planingId", ParseIntPipe) planingId: number,
    @Body(new ValidationPipe()) data: PlaningEntity
  ) {
    const planing = await this.planingService.updating(planingId, data);
    if (planing) {
      return JsonView.dataResponse(
        planing,
        "Le planing à été modifiée avec succès",
        HttpStatus.OK
      );
    }
  }

  @Delete(":planingId")
  public async deletePlaning(
    @Param("planingId", ParseIntPipe) planingId: number
  ) {
    const planing = await this.planingService.deleting(planingId);
    return JsonView.dataResponse(
      planing,
      "Planning supprimé avec succès",
      HttpStatus.OK
    );
  }
}
