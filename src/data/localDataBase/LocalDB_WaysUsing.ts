//* Локальная База Данных "Ways of using"
//! ВАЖНО!: в moment.js месяцы начинаются с 0 по 11
// Ways of using - способы применения (лекарства), например: "до еды", "после еды", "перед сном" <- это константы, которые выбирает user
// При заполнении формы, фиксируются 



// ! interface - вынисти отдельно в папку "types" файл typesWaysUsing.ts

// курсы 
// константы, которые будут в Форме в атрибутах type или value
interface IUnit {
    id: number
    type: 'day' | 'week' | 'month' | 'quarter' | 'year'
}

interface IUnitTime extends Array<IUnit>{}

export const unitTime: IUnitTime = [
    {
        id: 2,
        type: 'day',
    },
    {
        id: 3,
        type: 'week',
    },
    {
        id: 4,
        type: 'month',
    },
]

// массив видов приёма ЛС: перед приёмом пищи, перед сном
// type
interface IWayUsing {
    id: number
    type: 'empty stomach' | 'first breakfast' | 'last supper' | 'eating' | 'sleep'
    title: string
}
interface IWaysUsing extends Array<IWayUsing> {}

// data
const waysUsing: IWaysUsing = [
    {
        id: 1,
        type: 'eating',
        title: 'приём пищи',
    },
    {
        id: 2,
        type: 'first breakfast',
        title: 'первый завтрак',
    },
    {
        id: 3,
        type: 'last supper',
        title: 'последний ужин',
    },
]


//! массив Выражений времени: вовремя, до, после 
//type
interface IExpressionTime {
    id: number
    oftime: 'while' | 'before' | 'after'
}
interface IPositionAction extends Array<IExpressionTime> {}

// выражения времени: во время, до/перед, после (еды/сна/натощак )
const positionAction: IPositionAction = [
    {
        id: 1,
        oftime: 'before', // до (за время до, сразу перед едой...)
    },
    {
        id: 2,
        oftime: 'while', // вовремя
    },
    {
        id: 3,
        oftime: 'after', // после
    },
]

// курс лечения
interface Iduration {
    index: number
    title: 'days' | 'weeks' | 'months' | 'years' // for add(Number, String: 'weers' | 'days' | etc)

}

interface Iinterval {
    hour: number
    minute: number
}


// ! пример композиции (на примере одного ЛС)
export interface IRecipesMedication {
    id: number
    title: string
    depending: boolean
    action: string
    quantity: number
    unitTime: string
    position: string
    interval: Iinterval
    duration: Iduration
    start: string
    createDateRecipe: string
    updateDateRecipe: string
}


// years	
//quarters	
//months	
//weeks	
//days	

export interface IRecipesMedications extends Array<IRecipesMedication>{}

// разные лекарства
const recipesMedications: IRecipesMedications = [
    {
        id: 1,
        title: 'Урсосан',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { // exm: спустя 30 минут после еды 
            hour: 0,
            minute: 30
        }, 
        duration: {
            index: 7,
            title: "days", // currenDate <= currenDate.set(3, 'months')
        }, // продолжительность курса до 3 месяца  
        // start: {day: 26, month: 3, year: 2024}, // вариант в виде объекта
        start: '28.03.2024', // начало курса (по-умолчанию будет дата создания) - чтобы user сам мог котролировать начало
        //! ВАЖНО!: в moment.js месяцы начинаются с 0 по 11
        createDateRecipe: '28.03.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '28.03.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 2,
        title: 'Бифидокс1 2 недели',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 1, minute: 30}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 2,
            title: 'days', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 3,
        title: 'Бифидокс2',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 4,
        title: 'Бифидокс3',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт   
    },
    {
        id: 5,
        title: 'Бифидокс4',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 4, minute: 0}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса 1 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 6,
        title: 'Бифидокс5',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса 1 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 7,
        title: 'Бифидокс6',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 8,
        title: 'Бифидокс7',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
        
    },
    {
        id: 9,
        title: 'Бифидокс8',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт 
        
    },
    {
        id: 10,
        title: 'Пепсан-Р',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, 
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт 
    },
    {
        id: 11,
        title: 'Ибуприн',
        depending: false, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //   не активен
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 12,
        title: 'Альфазокс',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'after' после
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 13,
        title: 'Параксетин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1].type, // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не изменно 1 раз
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 14,
        title: 'Параксетин222',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1].type, // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не изменно 1 раз
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 15,
        title: 'Смекта',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1].type, // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не активен (по-умолчанию 1 раз)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'while' ВОВРЕМЯ
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 16,
        title: 'Анальгин2',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1].type, // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не активен (по-умолчанию 1 раз)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'after' ВОВРЕМЯ
        interval: { hour: 6, minute: 0}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 2,
            title: 'months', 
        },  
        start: '10.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 17,
        title: 'Эглонил',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2].type, // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 18,
        title: 'Ганатон',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2].type, // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'while' ВОВРЕМЯ
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 19,
        title: 'Тералиджин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2].type, // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, //  'after' ПОСЛЕ
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 20,
        title: 'Альфазокс',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - в зависимости от приёма еды
        quantity: 3, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 21,
        title: 'Тералиджин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - в зависимости от приёма еды
        quantity: 3, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, //  'after' ПОСЛЕ
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },
    {
        id: 22,
        title: 'Тералиджин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0].type, // 'eating' - в зависимости от приёма еды
        quantity: 3, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, //  'after' ПОСЛЕ
        interval: { hour: 0, minute: 45}, // exm: спустя 45 минут после еды 
        duration: { // продолжительность курса до 2 месяца 
            index: 1,
            title: 'months', 
        },  
        start: '07.04.2024',
        createDateRecipe: '07.04.2024',//  дата создания рецепта одного ЛС
        updateDateRecipe: '07.04.2024', //  возможность изменить весь рецепт
    },

    
]


export default recipesMedications