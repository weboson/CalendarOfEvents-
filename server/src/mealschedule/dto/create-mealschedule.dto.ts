//! Схема входящих данных
// какие поля ожидаются при создании графика приёма пищи

import { IsNotEmpty } from "class-validator";

export class CreateMealscheduleDto {

    @IsNotEmpty() // class-validator (в controller он задействован @UsePipes(new ValidationPipe())): Проверяет, не является ли заданное значение пустым - не должно быть пустым
    title: string // exemple: 'Мой режим питания' или 'Мой график приёма пищи'

    @IsNotEmpty() // поле не должно быть пустым при отправке на сервер
    type: string // weekend or weekday

    @IsNotEmpty()
    firstMeal: { hour: number; minute: string } // первый приём пищи
    
    @IsNotEmpty()
    lastMeal: { hour: number; minute: string } // последний приём пищи
}
