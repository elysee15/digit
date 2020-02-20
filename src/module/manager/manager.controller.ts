import {
  Controller,
  Get,
  HttpStatus,
  Param,
  HttpException,
  Post,
  Body,
  Put,
  Delete,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { JsonView } from "../../helpers/utils/JsonView";
import { ManagerEntity } from "./manager.entity";

@Controller("managers")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  public async getAllManager() {
    const manager = await this.managerService.getAll();
    if (Object.keys(manager).length === 0) {
      return JsonView.dataResponse(manager, "Manager empty", HttpStatus.OK);
    }
    return JsonView.dataResponse(
      manager,
      "Objects was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getManagerById(@Param("id", ParseIntPipe) id: number) {
    const manager = await this.managerService.getById(id);
    return JsonView.dataResponse(
      manager,
      "Manager was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postManager(
    @Body(new ValidationPipe({ transform: true })) data: ManagerEntity
  ) {
    const manager = await this.managerService.creating(data);
    if (manager) {
      return JsonView.dataResponse(
        manager,
        "Manager was successfully created",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Impossible to record, try again",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":id")
  public async updateManager(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) data: ManagerEntity
  ) {
    const manager = await this.managerService.updating(id, data);
    return JsonView.dataResponse(
      manager,
      "Manager was successfully updated",
      HttpStatus.OK
    );
  }

  @Delete(":id")
  public async deleteManager(@Param("id", ParseIntPipe) id: number) {
    const manager = await this.managerService.deleting(id);
    return JsonView.dataResponse(
      manager,
      "Manager was successfully deleted",
      HttpStatus.OK
    );
  }
}
