import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { MealscheduleService } from './mealschedule.service';
import { CreateMealscheduleDto } from './dto/create-mealschedule.dto';
import { UpdateMealscheduleDto } from './dto/update-mealschedule.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('mealschedules') // http://localhost:3000/api/mealschedules
export class MealscheduleController {
  constructor(private readonly mealscheduleService: MealscheduleService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // проверка на JWT-токен, есть ли он и действителен, т.е. авторизован ли user (в системе ли)
  @UsePipes(new ValidationPipe()) // class-validator
  create(@Body() createMealscheduleDto: CreateMealscheduleDto, @Req() req) { // @Req() - это ответ сервера (поля id и email user-а ) на входящий валидный JWT-токен
    return this.mealscheduleService.create(createMealscheduleDto, +req.user.id); // user.id - нужен для проверки связи с текущим user
  }

  //* будет только ОДИН график у каждого пользователя: комментить не стану
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.mealscheduleService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.mealscheduleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMealscheduleDto: UpdateMealscheduleDto) {
    return this.mealscheduleService.update(+id, updateMealscheduleDto);
  }

  //* удалять уже созданный график приёма пищи - не буду, иначе в календаре всё исчезнет или будет ошибка (будет по-умолчанию) - только обновление
  // комментить не стану
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealscheduleService.remove(+id);
  }
}
