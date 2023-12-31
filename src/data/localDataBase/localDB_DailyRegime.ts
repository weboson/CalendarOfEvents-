//* Локальная База Данных Daily Regime 
//! Daily Regime - режим дня - проснулся в такое время, лег спать в такое время
// пока база данных будет храниться локально (и пока без user):
import moment, { Moment } from "moment"


// свойства выходных или будней
interface Iweek {
  idWend: number
  startDay: Moment
  endDay: Moment
}

interface IModeRegime {
  weekdays: Iweek // режим в будни
  weekend: Iweek // режим в выходные
  wakefulness: number // количество часов бодровствования (чтобы делить на приёмы ЛС) - автоматически высчитывается в форме ввода.
}
// объект режима дня
interface IDaily {
    id: number
    title: string
    modeRegime: IModeRegime
    createdAt: Moment | string
    updatedAt: Moment | string
}
// массив объектов
export  interface IDailyRegimes extends Array<IDaily>{}



// Пример логики (GridDayWithHours): чтобы искать нужный объект режима дня, по его id
// let arr = dailyRegimes.find((item, index) => item.id == 2)
// console.log(arr)

// сами данные
// сохраненные режимы user сам будет выбирать из списка в форме, а искать будем в БД по id:
const dailyRegimes: IDailyRegimes = [
  {
    id: 1,
    title: 'первый и псоледний приём пищи',
    modeRegime: {
      weekdays: {
        idWend: 2,
        startDay: moment().hour(8 - 1).minute(30), // советуется бодровстовать 14-16 часов
        endDay: moment().hour(22 - 1).minute(0),
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        idWend: 3,
        startDay: moment().hour(10 - 1).minute(0), // советуется бодровстовать 14-16 часов
        endDay: moment().hour(22 - 1).minute(0),
      },
      wakefulness: 14, // количество часов бодровствования (чтобы делить на приёмы ЛС) - автоматически высчитывается в форме ввода.
    },
    createdAt: '12.12.2023',
    updatedAt: '14.12.2023',
  },
  {
    id: 2,
    title: 'режим другого пользователя',
    modeRegime: {
      weekdays: {
        idWend: 4,
        startDay: moment().hour(8 - 1).minute(30), // советуется бодровстовать 14-16 часов
        endDay: moment().hour(20 - 1).minute(0),
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        idWend: 5,
        startDay: moment().hour(8 - 1).minute(30), // советуется бодровстовать 14-16 часов
        endDay: moment().hour(20 - 1).minute(0),
      },
      wakefulness: 14, // количество часов бодровствования (чтобы делить на приёмы ЛС) - автоматически высчитывается в форме ввода.
    },
    createdAt: '12.12.2023',
    updatedAt: '14.12.2023',
  }

]


export default dailyRegimes;