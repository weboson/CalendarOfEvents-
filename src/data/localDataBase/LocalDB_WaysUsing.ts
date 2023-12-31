//* Локальная База Данных "Ways of using"
//! Ways of using - способы применения (лекарства), например: "до еды", "после еды", "перед сном" <- это константы, которые выбирает user
// При заполнении формы, фиксируются 

import moment from "moment"
import { Moment } from "moment"


// ! interface - вынисти отдельно в папку "types" файл typesWaysUsing.ts






// если вне зависимости от еды, просто 3 раза в день

// interface IRegardless {
//     id: number
//     oftime: 'no time' | null
// }
// interface IRegardlessOfFood extends Array<IRegardless> {}

// // data
// const regardlessOfFood: IRegardlessOfFood = [
//     {
//         id: 1,
//         oftime: 'no time', // вне зависимости от: приёма пищи, сна
//     }
// ]

// интервалы времени: за (20минут) до еды/сна
//type
// interface ITimeInterval {
//     id: number,
//     interval: Moment
// }

// interface ITimeIntervals extends Array<ITimeInterval> {}

// const timeIntervals:ITimeIntervals = [
//     {
//         id: 1,
//         interval: moment().minute(45) // exm: спустя 45 минут после еды 
//     },
//     {
//         id: 2,
//         interval: moment().minute(15) // exm: за 15 минут до завтрака

//     },
//     {
//         id: 3,
//         interval: moment().hour(2) // exm: за 2 часа перед сном

//     },
// ]


// export default { regardlessOfFood, waysUsing, expressionsTime, timeIntervals } ;

export const unitTime = [
    {
        id: 2,
        type: 'day',
        title: 'в день'
    },
    {
        id: 3,
        type: 'week',
        title: 'в неделю'
    },
    {
        id: 4,
        type: 'month',
        title: 'в месяц'
    },
    {
        id: 5,
        type: 'quarter',
        title: 'в квартал'
    },
    {
        id: 6,
        type: 'year',
        title: 'в год'
    },
]

// массив видов приёма ЛС: перед приёмом пищи, перед сном
// type
interface IWayUsing {
    id: number
    type: 'empty stomach' | 'first breakfast' | 'eating' | 'sleep'
    title: string
}
interface IWaysUsing extends Array<IWayUsing> {}

// data
const waysUsing: IWaysUsing = [
    {
        id: 1,
        type: 'empty stomach',
        title: 'пустой желудок (натощак)', // во время (while) пустого желудка
    },
    {
        id: 2,
        type: 'first breakfast',
        title: 'первый завтрак',
    },
    {
        id: 3,
        type: 'eating',
        title: 'приём пищи',
    },
    {
        id: 4,
        type: 'sleep',
        title: 'сон',
    },
]


//! массив Выражений времени: вовремя, до, после 
//type
interface IExpressionTime {
    id: number
    oftime: 'while' | 'before' | 'after'
}
interface IExpressionsTime extends Array<IExpressionTime> {}

// выражения времени: во время, до/перед, после (еды/сна/натощак )
const expressionsTime: IExpressionsTime = [
    {
        id: 1,
        oftime: 'while', // вовремя
    },
    {
        id: 2,
        oftime: 'before', // до (за время до, сразу перед едой...)
    },
    {
        id: 3,
        oftime: 'after', // после
    },
]


// ! пример композиции
const takingMedications = [
    {
        id: 5,
        isRegardlessOfFood: true, // *1 вне зависимости от еды/сна... просто 3 раза в день
        waysUsing: waysUsing[2].type, // *2 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        expTime: expressionsTime[2].oftime, // используется константа 'after'(после) из массива 
        // ! нужно изменить на первый приём пищи
        interval: 45, // exm: спустя 45 минут после еды 
        
        duration: moment().month(3), // продолжительность 3 месяца
        
        
    }
    
]

export default takingMedications