//! Recipe
//  для схемы (какие поля есть в БД) в БД
import { Mealschedule } from "src/mealschedule/entities/mealschedule.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Recipe {
    @PrimaryGeneratedColumn({ name: 'recipe_id' }) // автоматически генерирует значение для id для указанную колонку с именем "recipe_id", и указанным типом
    id: number
    // https://typeorm.io/entities#column-types
    @Column("varchar", { length: 200 }) // 'Урсосан', 'Ибупрофенэ etc.
    title: string

    @Column({ type: "boolean" }) // в зависимости/вне зависимости
    independently: boolean

    //* nullable: true - допускается значение null
    @Column({ type: "varchar", nullable: true }) // 'eating', 'first breakfast' etc.
    action: string

    @Column({ type: "int", nullable: true }) // exmple: 3 раза 
    quantity: number

    @Column({ type: "varchar", nullable: true }) // 'day','week', 'month' etc.
    unitTime: string

    @Column({ type: "varchar", nullable: true }) // 'before','after', 'while'etc.
    position: string

    @Column("simple-json", { nullable: true }) //! 'simple-json' - повзоляет сохранить объект в виде json: https://typeorm.io/entities#simple-json-column-type
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

    //* для связи к таблице user: https://typeorm.io/many-to-one-one-to-many-relations 
    @ManyToOne(() => User, (user) => user.recipes)
    @JoinColumn({ name: 'user_id' }) // колонка "user_id" будет иметь связь с user.id
    user: User

    //* для связи к таблице mealschedule (график приёма пищи определенного User)
    @ManyToOne(() => Mealschedule, (mealschedule) => mealschedule.recipes)
    @JoinColumn({ name: 'mealschedule_id' }) // колонка "mealschedule_id" будет иметь связь с mealschedule.id
    mealschedule: Mealschedule
}
