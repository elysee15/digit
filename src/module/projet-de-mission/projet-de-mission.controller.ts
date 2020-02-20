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
import { ProjetDeMissionService } from "./projet-de-mission.service";
import { JsonView } from "../../helpers/utils/JsonView";
import { ProjetDeMissionEntity } from "./projet-de-mission.entity";

@Controller("projet")
export class ProjetDeMissionController {
  constructor(
    private readonly projetDeMissionService: ProjetDeMissionService
  ) {}

  @Get()
  public async getAllProjetDeMission() {
    const projet = await this.projetDeMissionService.getAll();
    if (Object.keys(projet).length === 0) {
      return JsonView.dataResponse(projet, "Objects empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(projet, "Objects was successfully found",HttpStatus.OK);
  }

  @Get("total")
  public async getFindCount() {
    const total = await this.projetDeMissionService.findCount();
    return JsonView.dataResponse(
      total,
      "Nombre de projet de mission",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getProjetDeMissionById(@Param("id", ParseIntPipe) id: number) {
    const projet = await this.projetDeMissionService.getById(id);
    return JsonView.dataResponse(projet, "Object was successfully found", HttpStatus.OK);
  }

  @Post()
  public async postProjetDeMission(
    @Body(new ValidationPipe({ transform: true }))
    data: ProjetDeMissionEntity
  ) {
    const projet = await this.projetDeMissionService.creating(data);
    if (projet) {
      return JsonView.dataResponse(
        projet,
        "Le projet de mission a été enregistré avec succès",
        HttpStatus.OK
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":id")
  public async updateProjetDeMission(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    data: ProjetDeMissionEntity
  ) {
    const projet = await this.projetDeMissionService.updating(id, data);
    if (projet) {
      return JsonView.dataResponse(
        projet,
        "Le projet de mission à été modifiée avec succès",
        HttpStatus.OK
      );
    }
  }

  @Delete(":id")
  public async deleteProjetDeMission(@Param("id", ParseIntPipe) id: number) {
    const projet = await this.projetDeMissionService.deleting(id);
    return JsonView.dataResponse(projet, "Mission project was successfully deleted")
    
  }
}
