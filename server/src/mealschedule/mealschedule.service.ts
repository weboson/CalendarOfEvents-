// логика GET,POST и т.д для графика приёма пищи
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealscheduleDto } from './dto/create-mealschedule.dto';
import { UpdateMealscheduleDto } from './dto/update-mealschedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mealschedule } from './entities/mealschedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealscheduleService {
  constructor(
    @InjectRepository(Mealschedule) // внедрить схему, для работы TypeORM с ней
    private mealscheduleRepository: Repository<Mealschedule>) { }

  //! POST (new Mealschedule)
  async create(createMealscheduleDto: CreateMealscheduleDto, id: number) {
    const isExist = await this.mealscheduleRepository.findBy({
      // title: createMealscheduleDto.title, // чтобы название не дублировались
      user: { id: id }, // есть ли такой рецепт у текущего user (чтобы не дублировать)
      type: createMealscheduleDto.type // чтобы графики weekend и weekday были по ОДНОМУ
    })

    if (isExist.length) throw new BadRequestException(`У вас уже есть график на ${createMealscheduleDto.type}`)

    // если принятый график и его title уникален, то сохранить его со всеми полями :
    // createMealscheduleDto - уточнение входящих полей.
    const newMealschedule = {
      title: createMealscheduleDto.title,
      type: createMealscheduleDto.type,
      firstMeal: createMealscheduleDto.firstMeal,
      lastMeal: createMealscheduleDto.lastMeal,
      user: { id },// присвоить в колонку user == текущего user
      relations: { // связь с user
        user: true,
      },
    }
    return await this.mealscheduleRepository.save(newMealschedule); // сохранить в БД
  }

  //! GetAll
  async findAll(id: number) { // все графики, которые имеют связь с текущим user (с его id)
    return await this.mealscheduleRepository.find({
      where: {
        user: { id: id }, // где столбец связи user.id == id
      },
      relations: { // связь с user (принадлежит текущему user)
        user: true,
      },
    })
  }

  //! Get(id)
  // exemle: http://localhost:3000/api/mealschedules/1
  async findOne(id: number) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({
      where: { id: id }, // Искать по id, т.е. где id в БД == api/mealschedules/:id
      relations: { // связь с user и recipes
        user: true,
        recipes: true,
      },
    })
    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')
    return mealscheduleOne; // если найден, то =>
  }

  //! PATCH(id)
  // exemle: http://localhost:3000/api/mealschedules/mealschedule/1
  async update(id: number, updateMealscheduleDto: UpdateMealscheduleDto) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({
      where: { id: id },
    })

    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')

    return await this.mealscheduleRepository.update(id, updateMealscheduleDto); //update(id, поля которые принимаем)
  }

  //! DELETE
  async remove(id: number) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({
      where: { id: id },
    })

    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')

    return await this.mealscheduleRepository.delete(id); 
  }
}
