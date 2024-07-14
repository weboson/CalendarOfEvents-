//  для схемы (какие поля есть в БД) в БД
// TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"; // объявление сущности

@Entity() // для объявление (создания) сущности
export class User {
    @PrimaryGeneratedColumn() // автоматически генерирует указанную колонку, указанным типом
    id: number

    @Column({ type: "varchar" }) // https://typeorm.io/entities#column-types
    email: string

    @Column({ type: "varchar" }) // https://typeorm.io/entities#column-types
    password: string

    @CreateDateColumn() // автоматически создает дату создания каждого объекта
    createdAt: Date // создан такой даты

    @UpdateDateColumn()
    updateAt: Date // дата обновления определенного объекта

}
