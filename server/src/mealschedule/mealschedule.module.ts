import { Module } from '@nestjs/common';
import { MealscheduleService } from './mealschedule.service';
import { MealscheduleController } from './mealschedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mealschedule } from './entities/mealschedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mealschedule])], // подключили таблицу (схему)
  controllers: [MealscheduleController],
  providers: [MealscheduleService],
})
export class MealscheduleModule {}
