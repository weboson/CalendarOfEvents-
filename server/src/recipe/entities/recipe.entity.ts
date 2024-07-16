//! Recipe
//  для схемы (какие поля есть в БД) в БД
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Recipe {
    @PrimaryGeneratedColumn({name: 'recipe_id'}) // автоматически генерирует указанную колонку с именем "recipe_id", и указанным типом
    id: number
    // https://typeorm.io/entities#column-types
    @Column("varchar", { length: 200 }) // 'Урсосан', 'Ибупрофенэ etc.
    title: string

    @Column({ type: "boolean" }) // в зависимости/вне зависимости
    independently: boolean

    @Column({ type: "varchar" }) // 'eating', 'first breakfast' etc.
    action: string

    @Column({ type: "int" }) // exmple: 3 раза 
    quantity: number 

    @Column({ type: "varchar" }) // 'day','week', 'month' etc.
    unitTime: string

    @Column({ type: "varchar" }) // 'before','after', 'while'etc.
    position: string

    @Column("simple-json") //! 'simple-json' - повзоляет сохранить объект в виде json: https://typeorm.io/entities#simple-json-column-type
    interval: { hour: number; minute: number } // exm: спустя 30 минут после еды 

    @Column("simple-json") // 'simple-json' - позволяет сохранить объект в виде json: https://typeorm.io/entities#simple-json-column-type
    duration: { index: number; title: string } // продолжительность курса до 3 месяца - currenDate <= currenDate.set(3, 'months')
 
    @Column({ type: "date" })
    start: Date // начало курса (по-умолчанию будет дата создания) - чтобы user сам мог контролировать  начало

    // ВАЖНО!: в moment.js месяцы начинаются с 0 по 11
    @CreateDateColumn() // автоматически создает дату создания каждого объекта
    createDateRecipe: Date // рецепт создан такой даты

    @UpdateDateColumn() // автоматически создает дату ОБНОВЛЕНИЯ
    updateDateRecipe: Date //  возможность изменить весь рецепт 
}
