import { Injectable } from '@nestjs/common';
import { CreateMealscheduleDto } from './dto/create-mealschedule.dto';
import { UpdateMealscheduleDto } from './dto/update-mealschedule.dto';

@Injectable()
export class MealscheduleService {
  create(createMealscheduleDto: CreateMealscheduleDto) {
    return 'This action adds a new mealschedule';
  }

  findAll() {
    return `This action returns all mealschedule`;
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
