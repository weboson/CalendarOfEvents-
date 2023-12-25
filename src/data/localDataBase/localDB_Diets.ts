//* Локальная База Данных Diets (режим питания)
//! Diets - режим питания - сколько раз в день питаешься
//* в сервере нужны связи с user
// пока база данных будет храниться локально (и пока без связи user):
import moment, { Moment } from "moment"


// конкретный приём пищи
interface IMeal {
  id: number
  time: Moment
}

// конкрентая диета
interface IDiet {
    id: number
    title: string
    meals: Array<IMeal> | null// массив объектов (конкретных приёмов пищи)
    counter: number | null // result arr.length
    createdAt: Moment | string
    updatedAt: Moment | string
}
// массив объектов
export  interface IDietRegimes extends Array<IDiet>{}

// пользователь сам будет устанавливать время, когда он кушает - либо установится рекомендуемая диета (по умолчанию) 5 или 3 раза в день
const dietRegimes: IDietRegimes = [
    {
        id: 15,
        title: 'Моя диета №1', // будет генерироваться title "My diet №1(2,3,4...)"
        meals: [
            {
                // конкретный прием пищи 
                id: 1, // первый по index - значит завтрак
                time: moment().hour(9), // время приёма пищи: 9:00 
            },
            {
                id: 2, 
                time: moment().hour(12), // время приёма пищи: 12:00
            },
            {
                id: 3, 
                time: moment().hour(15), // время приёма пищи: 10:00
            },
            {
                id: 4, // первый по index - значит ужин (рекомендуется в форме за 2 часа до сна)
                time: moment().hour(18), // время приёма пищи: 18:00 
            },
            
        ],
        counter: ['meals'].length, // количество элем в массиве - то есть, сколько раз в день кушать < режим дня
        createdAt: '12.12.2023',
        updatedAt: '14.12.2023',

    },

    {
        id: 16,
        title: 'Моя диета №2', // будет генерироваться title "My diet №1(2,3,4...)"
        meals: [
            {
                // конкретный прием пищи 
                id: 1, // первый по index - значит завтрак
                time: moment().hour(9), // время приёма пищи: 9:00 (-1 потому что так настроен moment)
            },
            {
                id: 2, 
                time: moment().hour(13), // время приёма пищи: 12:00
            },
            {
                id: 3, 
                time: moment().hour(18), // время приёма пищи: 10:00
            },
            
        ],
        counter: ['meals'].length, // количество элем в массиве - то есть, сколько раз в день кушать < режим дня
        createdAt: '10.12.2023',
        updatedAt: '10.12.2023',

    }


]


export default dietRegimes;