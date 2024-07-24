import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity'; // таблица рецепт

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])], // подключили таблицу (схему)
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
