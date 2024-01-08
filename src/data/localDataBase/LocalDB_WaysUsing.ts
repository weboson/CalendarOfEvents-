//* Локальная База Данных "Ways of using"
//! Ways of using - способы применения (лекарства), например: "до еды", "после еды", "перед сном" <- это константы, которые выбирает user
// При заполнении формы, фиксируются 

import moment, { Moment } from "moment"


// ! interface - вынисти отдельно в папку "types" файл typesWaysUsing.ts

// курсы 
// константы, которые будут в Форме в атрибутах type или value
interface IUnit {
    id: number
    type: 'day' | 'week' | 'month' | 'quarter' | 'year'
    title: string
}

interface IUnitTime extends Array<IUnit>{}

export const unitTime: IUnitTime = [
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


// ! пример композиции (на примере одного ЛС)
export interface ITakingMedication {
    id: number
    title: string
    depending: boolean
    action: IWayUsing
    quantity: number
    unitTime: string
    position: string
    interval: Moment | null
    duration: Moment
}

interface ITakingMedications extends Array<ITakingMedication>{}

const takingMedications: ITakingMedications = [
    {
        id: 5,
        title: 'Ursonan',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, // Используется константа(потом будет в Form) в массива 
        interval: moment().hour(0).minute(30), // exm: спустя 45 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 6,
        title: 'Paroksetin',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, 
        interval: moment().hour(0).minute(30), 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 7,
        title: 'Eclonil',
        depending: false, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'while'
        interval: moment().hour(0).minute(30), // exm: спустя 30 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 8,
        title: 'Eclonilewewewew',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'after' после
        interval: moment().hour(1).minute(0), // exm: спустя 30 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    }
    
]

export default takingMedications