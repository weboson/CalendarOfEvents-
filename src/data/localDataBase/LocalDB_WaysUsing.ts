//* Локальная База Данных "Ways of using"
//! Ways of using - способы применения (лекарства), например: "до еды", "после еды", "перед сном" <- это константы, которые выбирает user


//! массив Выражение времени: вовремя, до, после 
//type
interface IExpressionTime {
    id: number
    oftime: 'while' | 'before' | 'after'
}
interface IExpressionsTime extends Array<IExpressionTime> {}

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


//! массив видов приёма ЛС: перед приёмом пищи, перед сном
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




//! если вне зависимости от еды, просто 3 раза в день
//type
interface IRegardless {
    id: number
    oftime: 'no time' | null
}
interface IRegardlessOfFood extends Array<IRegardless> {}

// data
const regardlessOfFood: IRegardlessOfFood = [
    {
        id: 1,
        oftime: 'no time', // вне зависимости от: приёма пищи, сна
    }
]



export default [regardlessOfFood, waysUsing, expressionsTime] ;