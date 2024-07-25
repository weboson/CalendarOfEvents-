// логика GET,POST и т.д для рецептов
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  //! POST (new recipe)
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

  //! Getll
  async findAll(id: number) { // все рецепты, которые имеют связь с текущим user (с его id)
    return await this.recipeRepository.find({
      where: {
        user: { id: id }, // где столбец связи user.id == id
      },
      relations: { // и где есть связь с таблицей mealschedule (график приёма пищи)
        mealschedule: true,
      }
    })
  }

  //! Get(id)
  // exemle: http://localhost:3000/api/recipes/2
  async findOne(id: number) {
    const recipeOne = await this.recipeRepository.findOne({
      where: { id: id }, // Искать по id, т.е. где id в БД == api/recipes/:id
      relations: { // связь с user и mealschedule
        user: true,
        mealschedule: true,
      },
    })
    if (!recipeOne) throw new NotFoundException('Рецепт не найден')
    return recipeOne; // если найден, то =>
  }

  //! PATCH(id)
  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipeOne = await this.recipeRepository.findOne({
      where: { id: id },
    })

    if (!recipeOne) throw new NotFoundException('Рецепт не найден')

    return await this.recipeRepository.update(id, updateRecipeDto); //update(id, поля которые принимаем)
  }

  async remove(id: number) {
    const recipeOne = await this.recipeRepository.findOne({
      where: { id: id },
    })

    if (!recipeOne) throw new NotFoundException('Рецепт не найден')

    return await this.recipeRepository.delete(id); //update(id, поля которые принимаем)
  }
}
