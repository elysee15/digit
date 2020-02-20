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
import { CategorieService } from "./categorie.service";
import { JsonView } from "../../helpers/utils/JsonView";
import { CategorieEntity } from "./categorie.entity";

@Controller("categories")
export class CategorieController {
  constructor(private readonly categoryService: CategorieService) {}

  @Get()
  public async getAllCategorie() {
    const categorie = await this.categoryService.getAll();
    if (Object.keys(categorie).length === 0) {
      return JsonView.dataResponse(
        categorie,
        "Categories empty",
        HttpStatus.OK
      );
    }
    return JsonView.dataResponse(
      categorie,
      "Categories was successfully found",
      HttpStatus.OK
    );
  }

  @Get(":id")
  public async getCategorieById(@Param("id", ParseIntPipe) id: number) {
    const categorie = await this.categoryService.getById(id);
    return JsonView.dataResponse(
      categorie,
      "Categorie was successfully found",
      HttpStatus.OK
    );
  }

  @Post()
  public async postCategorie(
    @Body(new ValidationPipe()) data: CategorieEntity
  ) {
    const categorie = await this.categoryService.creating(data);
    if (categorie) {
      return JsonView.dataResponse(
        categorie,
        "Categorie was successfully record",
        HttpStatus.CREATED
      );
    }
    throw new HttpException(
      "Cannot record, try again",
      HttpStatus.NOT_MODIFIED
    );
  }

  @Put(":categorieId")
  public async updateCategorie(
    @Param("categorieId", ParseIntPipe) categorieId: number,
    @Body(new ValidationPipe()) data: CategorieEntity
  ) {
    const categorie = await this.categoryService.updating(categorieId, data);
    return JsonView.dataResponse(
      categorie,
      "Category was successfully updated",
      HttpStatus.OK
    );
  }

  @Delete(":categorieId")
  public async deleteCategorie(
    @Param("categorieId", ParseIntPipe) categorieId: number
  ) {
    const categorie = await this.categoryService.deleting(categorieId);
    return JsonView.dataResponse(
      categorie,
      "Categorie was successfully deleted",
      HttpStatus.OK
    );
  }
}
