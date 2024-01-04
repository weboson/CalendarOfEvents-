//* Локальная База Данных "mealSchedule" - имеет два варианта weekday и weekend
//! mealSchedule - график питания - первый и последний приём пищи
// пока база данных будет храниться локально (и пока без user):
import moment, { Moment } from "moment"


// свойства выходных или будней
interface IWeek {
  id: number
  firstMeal: Moment
  lastMeal: Moment
}

interface IModeRegime {
  weekdays: IWeek // режим питания в будни
  weekend: IWeek // режим питания в выходные
}

// объект графика питания
interface ISchedule {
    id: number
    title: string
    modeRegime: IModeRegime
    createdAt: Moment | string
    updatedAt: Moment | string
}
// массив объектов
export  interface IMealSchedule extends Array<ISchedule>{}



// Пример логики (GridDayWithHours): чтобы искать нужный объект режима дня, по его id
// let arr = dailyRegimes.find((item, index) => item.id == 2)
// console.log(arr)

// сами данные
// сохраненные режимы user сам будет выбирать из списка в форме, а искать будем в БД по id:
const mealSchedule: IMealSchedule = [
  {
    id: 1,
    title: 'первый и последний приём пищи',
    modeRegime: {
      weekdays: {
        id: 2,
        firstMeal: moment().hour(8).minute(0), // 8:00
        lastMeal: moment().hour(22).minute(20), // 22:00
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: moment().hour(10).minute(0), // советуется бодровстовать 14-16 часов
        lastMeal: moment().hour(23).minute(34),
      },
    },
    createdAt: '12.12.2023',
    updatedAt: '14.12.2023',
  },
  {
    id: 2,
    title: 'режим питания другого пользователя',
    modeRegime: {
      weekdays: {
        id: 2,
        firstMeal: moment().hour(7).minute(30), // советуется бодровстовать 14-16 часов
        lastMeal: moment().hour(22).minute(0),
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: moment().hour(9).minute(0), // советуется бодровстовать 14-16 часов
        lastMeal: moment().hour(23).minute(0),
      },
    },
    createdAt: '12.12.2023',
    updatedAt: '14.12.2023',
  },

]


export default mealSchedule;