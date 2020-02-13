import {Controller, Get, HttpStatus, Param, Put, Body, Post, NotFoundException, HttpException, Delete, ParseIntPipe} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { JsonView } from '../../helpers/utils/JsonView';
import { CategorieEntity } from './categorie.entity';

@Controller('categorie')
export class CategorieController {
    constructor(
        private readonly categoryService : CategorieService
    ){}

    @Get()
    public async getAllCategorie(){
        const categorie = await this.categoryService.getAll();
        return JsonView.dataResponse(categorie, "Liste des categories", HttpStatus.OK);
    }

    @Get(':id')
    public async getCategorieById(@Param('id', ParseIntPipe) id: number){
        const categorie = await this.categoryService.getById(id);
        if (categorie){
            return JsonView.dataResponse(categorie, "", HttpStatus.OK);
        }
        throw new HttpException("La categorie n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async postCategorie(@Body() categorieDto){
        const categorie = await this.categoryService.creating(categorieDto);
        if (categorie){
            return JsonView.dataResponse(categorie, "La catégorie a été enregistrée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Enregistrement impossible, veuillez réessayer", HttpStatus.NOT_MODIFIED);
    }

    @Put(':categorieId')
    public async updateCategorie(@Param('categorieId', ParseIntPipe) categorieId: number, @Body() categorieDto: CategorieEntity){
        const categorie = await this.categoryService.updating(categorieId, categorieDto);
        if (categorie){
            return JsonView.dataResponse(categorie, "La categorie à été modifiée avec succès", HttpStatus.OK);
        }
        throw new HttpException("Modification impossible car catégorie inexistante", HttpStatus.NOT_FOUND);
    }

    @Delete(':categorieId')
    public async deleteCategorie(@Param('categorieId', ParseIntPipe) categorieId: number){
        const categorie = await this.categoryService.deleting(categorieId);
        if (categorie){
            return "Catégorie supprimée";
        }
        throw new HttpException("Suppression impossible car catégorie inexistante", HttpStatus.NOT_FOUND);
    }

    
}
