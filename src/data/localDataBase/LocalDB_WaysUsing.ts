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

// разные лекарства
const takingMedications: ITakingMedications = [
    {
        id: 5,
        title: 'Ursonan',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, // Используется константа(потом будет в Form) в массива 
        interval: moment().hour(0).minute(30), // exm: спустя 45 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 6,
        title: 'Pepsan',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, 
        interval: moment().hour(1).minute(0), 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 7,
        title: 'Eclonil',
        depending: false, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //   не активен
        interval: moment().hour(0).minute(0), // exm: спустя 30 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 8,
        title: 'Eclonilewewewew',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[0], // 'eating' - приём пищи
        quantity: 3, // 3 раза
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'after' после
        interval: moment().hour(1).minute(0), // exm: спустя 30 минут после еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 9,
        title: 'Параксетин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1], // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не изменно 1 раз
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: moment().hour(0).minute(45), // exm: за 30 минут ДО еды 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 10,
        title: 'Смекта',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1], // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не активен (по-умолчанию 1 раз)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'while' ВОВРЕМЯ
        interval: moment().hour(0).minute(45), // не активен
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 11,
        title: 'Анальгин',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[1], // 'first breakfast' - в зависимости от 1-го приёма пищи
        quantity: 1, // не активен (по-умолчанию 1 раз)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, //  'after' ВОВРЕМЯ
        interval: moment().hour(1).minute(30), // не активен
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 12,
        title: 'Эглонил',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2], // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[0].oftime, //  'before' ДО
        interval: moment().hour(1).minute(30), // 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 13,
        title: 'Эглонил2',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2], // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[1].oftime, //  'while' ВОВРЕМЯ
        interval: moment().hour(1).minute(30), // не активен
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },
    {
        id: 14,
        title: 'Эглонил3',
        depending: true, //  в зависимости/вне зависимости от еды/сна... просто 3 раза в день
        action: waysUsing[2], // 'last supper' - в зависимости от последнего приёма еды
        quantity: 1, // не активен (по-умолчанию 1 раз в день)
        unitTime: unitTime[0].type, // day -  в день
        position: positionAction[2].oftime, //  'after' ПОСЛЕ
        interval: moment().hour(1).minute(0), // 
        duration: moment().month(3), // продолжительность курса 3 месяца
        
        
    },

    
]

export default takingMedications