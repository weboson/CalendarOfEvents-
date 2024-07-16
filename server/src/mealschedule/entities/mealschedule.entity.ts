//! Meal schedule - таблица графика приёма пищи
//  для схемы (какие поля есть в БД) в БД
// это таблица - TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Mealschedule {

    @PrimaryGeneratedColumn({name: 'recipe_id'}) // автоматически генерирует значение для id для указанную колонку с именем "recipe_id", и указанным типом
    id: number

    @Column("varchar", { length: 200, nullable: true }) // 'приём пищи', может быть null
    title: string

    @Column("varchar", { length: 200}) // weekend or weekday
    type: string

    // первый приём пищи
    @Column("simple-json") // 'simple-json' - позволяет сохранить объект в виде json: https://typeorm.io/entities#simple-json-column-type
    firstMeal: { hour: number; minute: string } // продолжительность курса до 3 месяца - currenDate <= currenDate.set(3, 'months')
    
    // последний приём пищи
    @Column("simple-json")
    lastMeal: { hour: number; minute: string }

    @CreateDateColumn() // автоматически создает дату создания каждого объекта
    createDateMeal: Date // рецепт создан такой даты

    @UpdateDateColumn() // автоматически создает дату ОБНОВЛЕНИЯ
    updateDateMeal: Date //  возможность изменить весь рецепт 

}
