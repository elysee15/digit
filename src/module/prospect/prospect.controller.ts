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
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { JsonView } from "../../helpers/utils/JsonView";
import { ProspectService } from "./prospect.service";
import { ProspectEntity } from "./prospect.entity";

@Controller("prospect")
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Get()
  public async getAllProspect() {
    const prospect = await this.prospectService.getAll();
    if (Object.keys(prospect).length === 0) {
      return JsonView.dataResponse(prospect, "Object empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      prospect,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get("total")
  public async getCountProspect() {
    const prospect = await this.prospectService.countProspect();
    return JsonView.dataResponse(prospect, "Nombre total des prospects", HttpStatus.OK);
  }

  @Get(":id")
  public async getProspectById(@Param("id", ParseIntPipe) id: number) {
    const prospect = await this.prospectService.getById(id);
    if (prospect) {
      return JsonView.dataResponse(prospect, "Object was successfully found", HttpStatus.OK);
    }
  }

  @Post()
  public async postProspect(
    @Body(new ValidationPipe({ transform: true })) data: ProspectEntity
  ) {
    const prospect = await this.prospectService.creating(data);
    if (prospect) {
      return JsonView.dataResponse(
        prospect,
        "Le prospect a été enregistré avec succès",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  
  @Put(":prospectId")
  public async updateProspect(
    @Param("prospectId", ParseIntPipe) prospectId: number,
    @Body(new ValidationPipe({ transform: true })) data: ProspectEntity
  ) {
    const prospect = await this.prospectService.updating(prospectId,data);
    if (prospect) {
      return JsonView.dataResponse(
        prospect,
        "Le prospect à été modifié avec succès",
        HttpStatus.OK
      );
    }
  }

  @Delete(":prospectId")
  public async deleteProspect(
    @Param("prospectId", ParseIntPipe) prospectId: number
  ) {
    const prospect = await this.prospectService.deleting(prospectId);
    return JsonView.dataResponse(prospect, "Prospect was successfully deleted", HttpStatus.OK)
  }
}
