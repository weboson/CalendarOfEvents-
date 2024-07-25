// логика GET,POST и т.д для графика приёма пищи
import { BadRequestException, Injectable } from '@nestjs/common';
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
      user: { id: id }, // есть ли такой график у текущего user (чтобы не дублировать)
      title: createMealscheduleDto.title // чтобы название не дублировались
    })

    if (isExist.length) throw new BadRequestException('Измените название графика приёма пищи - такое название уже есть')

    // если принятый график и его title уникален, то сохранить его со всеми полями :
    // createMealscheduleDto - уточнение входящих полей.
    const newMealschedule = {
      title: createMealscheduleDto.title,
      type: createMealscheduleDto.type,
      firstMeal: createMealscheduleDto.firstMeal,
      lastMeal: createMealscheduleDto.lastMeal,
      user: {
        id: id // id из аргументов (create())
      }
    }
    return await this.mealscheduleRepository.save(newMealschedule); // сохранить в БД
  }

  //! GetAll
  async findAll(id: number) { // все графики, которые имеют связь с текущим user (с его id)
    return await this.mealscheduleRepository.find({
      where: {
        user: { id: id }, // где столбец связи user.id == id
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} mealschedule`;
  }

  update(id: number, updateMealscheduleDto: UpdateMealscheduleDto) {
    return `This action updates a #${id} mealschedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealschedule`;
  }
}
