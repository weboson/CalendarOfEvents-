//* Локальная База Данных Diets (режим питания)
//! Diets - режим питания - сколько раз в день питаешься
//* в сервере нужны связи с user
// пока база данных будет храниться локально (и пока без связи user):
import moment, { Moment } from "moment"


// конкретный приём пищи
interface IWeekdayOrWeekend {
    id: number
    time: Moment
}

// режимы питания в будни и выходные
interface IMeal {
    weekday: Array<IWeekdayOrWeekend>
    weekend: Array<IWeekdayOrWeekend>
}

// конкрентая диета
interface IDiet {
    id: number
    title: string
    meals: IMeal // массив объектов (конкретных приёмов пищи)
    counter: number | null // result arr.length
    createdAt: Moment | string
    updatedAt: Moment | string
}
// массив объектов
export  interface IDietRegimes extends Array<IDiet>{}

// пользователь сам будет устанавливать время, когда он кушает - либо установится рекомендуемая диета (по умолчанию) 5 или 3 раза в день
const dietRegimes: IDietRegimes = [
    // первый режим питания
    {
        id: 15,
        title: 'Моя диета №1', // будет генерироваться title "My diet №1(2,3,4...)"
        meals: {
            weekday: [
                {
                    // конкретный прием пищи 
                    id: 1, // первый по index - значит завтрак
                    time: moment().hour(8).minute(30), // время приёма пищи: 9:00 
                },
                {
                    id: 2, 
                    time: moment().hour(12).minute(0), // время приёма пищи: 12:00
                },
                {
                    id: 3, 
                    time: moment().hour(15).minute(30), // время приёма пищи: 10:00
                },
                {
                    id: 4, // первый по index - значит ужин (рекомендуется в форме за 2 часа до сна)
                    time: moment().hour(18).minute(35), // время приёма пищи: 18:00 
                },
                
            ],
            weekend: [
                {
                    // конкретный прием пищи 
                    id: 1, // первый по index - значит завтрак
                    time: moment().hour(10).minute(0), // время приёма пищи: 9:00 
                },
                {
                    id: 2, 
                    time: moment().hour(13).minute(30), // время приёма пищи: 12:00
                },
                {
                    id: 3, 
                    time: moment().hour(16).minute(30), // время приёма пищи: 10:00
                },
                {
                    id: 4, // первый по index - значит ужин (рекомендуется в форме за 2 часа до сна)
                    time: moment().hour(19).minute(30), // время приёма пищи: 18:00 
                },
                
            ]
        },
        counter: ['meals'].length, // количество элем в массиве - то есть, сколько раз в день кушать < режим дня
        createdAt: '12.12.2023',
        updatedAt: '14.12.2023',

    },
// второй режим питания
    {
        id: 16,
        title: 'Моя диета №2', // будет генерироваться title "My diet №1(2,3,4...)"
        meals: {
            weekday: [
                {
                    // конкретный прием пищи 
                    id: 1, // первый по index - значит завтрак
                    time: moment().hour(8).minute(30), // время приёма пищи: 9:00 
                },
                {
                    id: 2, 
                    time: moment().hour(12).minute(0), // время приёма пищи: 12:00
                },
                {
                    id: 3, 
                    time: moment().hour(15).minute(30), // время приёма пищи: 10:00
                },
                {
                    id: 4, // первый по index - значит ужин (рекомендуется в форме за 2 часа до сна)
                    time: moment().hour(18).minute(35), // время приёма пищи: 18:00 
                },
                
            ],
            weekend: [
                {
                    // конкретный прием пищи 
                    id: 1, // первый по index - значит завтрак
                    time: moment().hour(10).minute(0), // время приёма пищи: 9:00 
                },
                {
                    id: 2, 
                    time: moment().hour(13).minute(30), // время приёма пищи: 12:00
                },
                {
                    id: 3, 
                    time: moment().hour(16).minute(30), // время приёма пищи: 10:00
                },
                {
                    id: 4, // первый по index - значит ужин (рекомендуется в форме за 2 часа до сна)
                    time: moment().hour(19).minute(30), // время приёма пищи: 18:00 
                },
                
            ]
        },
        counter: ['meals'].length, // количество элем в массиве - то есть, сколько раз в день кушать < режим дня
        createdAt: '12.12.2023',
        updatedAt: '14.12.2023',

    }

]


export default dietRegimes;