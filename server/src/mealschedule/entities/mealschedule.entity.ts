//! Meal schedule - таблица графика приёма пищи - один график у одного user
//  Этими декораторами потипу "@Entity()" or "@Column" СОЗДАЮТСЯ (буквально в реальном времени) таблицы в БД
// это таблица - TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Recipe } from "src/recipe/entities/recipe.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Mealschedule {

    @PrimaryGeneratedColumn({ name: 'mealschedule_id' }) // автоматически генерирует значение для id для указанную колонку с именем "recipe_id", и указанным типом
    id: number

    @Column("varchar", { length: 200}) // 'приём пищи', может быть null
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
    @ManyToOne(() => User, (user) => user.mealschedule)
    // объеденим в одну колонку 'user_id' - хотя зачем? пусть пока будет
    @JoinColumn({ name: 'user_id' }) // колонка "user_id" будет иметь связь с user.id
    // описание связи с типом (это не поле)
    user: User

    //* для связи с таблицей recipe
    @OneToMany(() => Recipe, (recipe) => recipe.mealschedule)
    // описание связи с типом (это не поле)
    recipes: Recipe[]

}
