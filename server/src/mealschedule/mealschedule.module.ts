import { Module } from '@nestjs/common';
import { MealscheduleService } from './mealschedule.service';
import { MealscheduleController } from './mealschedule.controller';

@Module({
  controllers: [MealscheduleController],
  providers: [MealscheduleService],
})
export class MealscheduleModule {}
