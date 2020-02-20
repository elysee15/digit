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
import { ProspectionService } from "./prospection.service";
import { ProspectionEntity } from "./prospection.entity";

@Controller("prospection")
export class ProspectionController {
  constructor(private readonly prospectionService: ProspectionService) {}

  @Get()
  public async getAllProspection() {
    const prospection = await this.prospectionService.getAll();
    if (Object.keys(prospection).length === 0) {
      return JsonView.dataResponse(prospection, "Object empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      prospection,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get("total")
  public async getCountProspection() {
    const total = await this.prospectionService.findCount();
    return JsonView.dataResponse(total, "Total des prospections", 201);
  }

  @Get(":id")
  public async getProspectionById(@Param("id", ParseIntPipe) id: number) {
    const prospection = await this.prospectionService.getById(id);
    return JsonView.dataResponse(
      prospection,
      "Object was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postProspection(
    @Body(new ValidationPipe({ transform: true }))
    data: ProspectionEntity
  ) {
    const prospection = await this.prospectionService.creating(data);
    if (prospection) {
      return JsonView.dataResponse(
        prospection,
        "Le prospection a été enregistré avec succès",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Enregistrement impossible, veuillez réessayer",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":prospectionId")
  public async updateProspection(
    @Param("prospectionId", ParseIntPipe) prospectionId: number,
    @Body(new ValidationPipe({ transform: true }))
    data: ProspectionEntity
  ) {
    const prospection = await this.prospectionService.updating(
      prospectionId,
      data
    );
    return JsonView.dataResponse(
      prospection,
      "La prospection à été modifiée avec succès",
      HttpStatus.OK
    );
  }

  @Delete(":prospectionId")
  public async deleteProspection(
    @Param("prospectionId", ParseIntPipe) prospectionId: number
  ) {
    const prospection = await this.prospectionService.deleting(prospectionId);
    return JsonView.dataResponse(
      prospection,
      "Prospection was successfully deleted"
    );
  }
}
