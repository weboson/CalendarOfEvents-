//! Схема входящих данных
// какие поля ожидаются при создании рецепта
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateRecipeDto {
    //* Шаг #1: Добавьте лекарство
    @IsNotEmpty() // class-validator: Проверяет, не является ли заданное значение пустым - не должно быть пустым
    title: string // 'Урсосан', 'Ибупрофенэ etc.
    
    //* Шаг #2: Зависимость приёма
    @IsOptional()
    independently?: boolean // в зависимости/вне зависимости

    @IsOptional()
    interval?: { hour: number; minute: number } // exm: спустя "0:30" после еды 
    
    //* Шаг #3: Особенности приёма
    @IsOptional()
    position?: string // 'before','after', 'while'etc.

    @IsOptional()
    action?: string // 'eating', 'first breakfast' etc.

    //* Шаг #4: Количество приёмов
    @IsNotEmpty()
    quantity: number // exmple: 3 раза

    @IsNotEmpty()
    unitTime: string // 'day','week', 'month' etc.

    //* Шаг #5: Курс приёма ЛС
    @IsNotEmpty()
    duration: { index: number; title: string } // exm: продолжительность курса "3 месяца" 

    //* Шаг #6: Дата начала курса:
    @IsNotEmpty()
    start: Date // начало курса (по-умолчанию будет дата создания) - чтобы user сам мог контролировать  начало

}
