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
import { JsonView } from "src/helpers/utils/JsonView";
import { BesoinService } from "./besoin.service";
import { BesoinEntity } from "./besoin.entity";

@Controller("besoins")
export class BesoinController {
  constructor(private readonly besoinService: BesoinService) {}

  @Get()
  public async getAllBesoin() {
    const besoin = await this.besoinService.getAll();
    if (Object.keys(besoin).length === 0) {
      return JsonView.dataResponse(besoin, "Objects empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      besoin,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get("total")
  public async getCountBesoin() {
    const total = await this.besoinService.findCount();
    return JsonView.dataResponse(total, "Nombre total de fiche de besoins");
  }

  @Get(":id")
  public async getBesoinById(@Param("id", ParseIntPipe) id: number) {
    const besoin = await this.besoinService.getById(id);
    return JsonView.dataResponse(
      besoin,
      "Object was successfull found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postBesoin(
    @Body(new ValidationPipe({ transform: true })) data: BesoinEntity
  ) {
    const besoin = await this.besoinService.creating(data);
    if (besoin) {
      return JsonView.dataResponse(
        besoin,
        "Object was successfully save",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Impossible to record, try again",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":besoinId")
  public async updateBesoin(
    @Param("besoinId", ParseIntPipe) besoinId: number,
    @Body(new ValidationPipe({ transform: true })) data: BesoinEntity
  ) {
    const besoin = await this.besoinService.updating(besoinId, data);
    return JsonView.dataResponse(
      besoin,
      "Object was successfully modified",
      HttpStatus.OK
    );
  }

  @Delete(":besoinId")
  public async deleteBesoin(@Param("besoinId", ParseIntPipe) besoinId: number) {
    const besoin = await this.besoinService.deleting(besoinId);
    return JsonView.dataResponse(besoin, "Object was successfully deleted");
  }
}
