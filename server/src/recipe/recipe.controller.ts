import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('recipes') // http://localhost:3000/api/recipes
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  // сторож - если не пройти проверку, то дальше код не пойдет
  @UseGuards(JwtAuthGuard) // проверка на JWT-токен, есть ли он и действителен, т.е. авторизован ли user (в системе ли)
  create(@Body() createRecipeDto: CreateRecipeDto, @Req() req) { // @Req() - это ответ сервера (поля id и email user-а ) на входящий валидный JWT-токен 
    return this.recipeService.create(createRecipeDto, +req.user.id);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
