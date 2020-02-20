import {
  Controller,
  Get,
  HttpStatus,
  Param,
  HttpException,
  Put,
  Body,
  Delete,
  Post,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { OffreDeMissionService } from "./offre-de-mission.service";
import { JsonView } from "../../helpers/utils/JsonView";
import { OffreDeMissionEntity } from "./offre-de-mission.entity";

@Controller("offres-de-mission")
export class OffreDeMissionController {
  constructor(private readonly offreDeMissionService: OffreDeMissionService) {}

  @Get()
  public async getAllOffreDeMission() {
    const offre = await this.offreDeMissionService.getAll();
    if (Object.keys(offre).length === 0) {
      return JsonView.dataResponse(offre, "Objects empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      offre,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get("total")
  public async getFindCount() {
    const total = await this.offreDeMissionService.findCount();
    return JsonView.dataResponse(
      total,
      "Nombre d'offre de mission",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getOffreDeMissionById(@Param("id", ParseIntPipe) id: number) {
    const offre = await this.offreDeMissionService.getById(id);
    return JsonView.dataResponse(
      offre,
      "Object was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postOffreDeMission(
    @Body(new ValidationPipe({ transform: true })) data: OffreDeMissionEntity
  ) {
    const offre = await this.offreDeMissionService.creating(data);
    if (offre) {
      return JsonView.dataResponse(
        offre,
        "L'offre de mission a été enregistrée avec succès",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":id")
  public async updateOffreDeMission(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) data: OffreDeMissionEntity
  ) {
    const offre = await this.offreDeMissionService.updating(id, data);
    return JsonView.dataResponse(
      offre,
      "L'offre de mission à été modifiée avec succès",
      HttpStatus.OK
    );
  }

  @Delete(":id")
  public async deleteOffreDeMission(@Param("id", ParseIntPipe) id: number) {
    const projet = await this.offreDeMissionService.deleting(id);
    return JsonView.dataResponse(
      projet,
      "Offre de mission supprimée avec succès",
      HttpStatus.OK
    );
  }
}
