import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // заменитель SQL-запросов
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) // внедрить схему, для работы TypeORM с ней
    private recipeRepository: Repository<Recipe>) { }

  async create(createRecipeDto: CreateRecipeDto, id: number) { // id - чтобы проверить, существует ли такой рецепт с таким id в БД (чтобы не дублировать - несколько нажатий на кнопку "отправить"): https://youtu.be/p3iSpCvDAsI?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=251 

    const isExist = await this.recipeRepository.findBy({
      user: { id: id }, // есть ли такой рецепт у текущего user (чтобы не дублировать)
      title: createRecipeDto.title
    })

    if (isExist.length) throw new BadRequestException('Этот рецепт уже существует!')

    // если принятый рецепт уникален, то сохранить его со всеми полями :
    // createRecipeDto - уточнение входящих полей.
    const newRecipe = {
      title: createRecipeDto.title,
      independently: createRecipeDto.independently,
      interval: createRecipeDto.interval,
      position: createRecipeDto.position,
      action: createRecipeDto.action,
      quantity: createRecipeDto.quantity,
      unitTime: createRecipeDto.unitTime,
      duration: createRecipeDto.duration,
      start: createRecipeDto.start,
      user: {
        id: id // id из аргументов (create())
      }
    }
    return await this.recipeRepository.save(newRecipe); // сохранить в БД
  }

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
