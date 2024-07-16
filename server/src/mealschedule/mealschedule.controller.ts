import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealscheduleService } from './mealschedule.service';
import { CreateMealscheduleDto } from './dto/create-mealschedule.dto';
import { UpdateMealscheduleDto } from './dto/update-mealschedule.dto';

@Controller('mealschedule')
export class MealscheduleController {
  constructor(private readonly mealscheduleService: MealscheduleService) {}

  @Post()
  create(@Body() createMealscheduleDto: CreateMealscheduleDto) {
    return this.mealscheduleService.create(createMealscheduleDto);
  }

  @Get()
  findAll() {
    return this.mealscheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealscheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealscheduleDto: UpdateMealscheduleDto) {
    return this.mealscheduleService.update(+id, updateMealscheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealscheduleService.remove(+id);
  }
}
