//! Meal schedule - таблица графика приёма пищи
//  для схемы (какие поля есть в БД) в БД
// это таблица - TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Recipe } from "src/recipe/entities/recipe.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Mealschedule {

    @PrimaryGeneratedColumn({ name: 'mealschedule_id' }) // автоматически генерирует значение для id для указанную колонку с именем "recipe_id", и указанным типом
    id: number

    @Column("varchar", { length: 200, nullable: true }) // 'приём пищи', может быть null
    title: string

    @Column("varchar", { length: 200 }) // weekend or weekday
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

    //* для связи с таблицей user: https://typeorm.io/many-to-one-one-to-many-relations 
    @OneToOne(() => User, (user) => user.recipes)
    @JoinColumn({ name: 'user_id' }) // колонка "user_id" будет иметь связь с user.id
    // описание связи с типом (это не поле)
    user: User

    //* для связи с таблицей recipe
    @OneToMany(() => Recipe, (recipe) => recipe.mealschedule)
    // описание связи с типом (это не поле)
    recipes: Recipe[]

}
