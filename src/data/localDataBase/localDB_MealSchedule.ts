//* Локальная База Данных "mealSchedule" - имеет два варианта weekday и weekend
//! mealSchedule - график питания - первый и последний приём пищи
// пока база данных будет храниться локально (и пока без user):
import moment, { Moment } from "moment"


interface IFirstMealLastMeal {
  hour: number
  minute: number
}


// свойства выходных или будней
interface IWeek {
  id: number
  firstMeal: IFirstMealLastMeal
  lastMeal: IFirstMealLastMeal
}

interface IModeRegime {
  weekdays: IWeek // режим питания в будни
  weekend: IWeek // режим питания в выходные
}

interface ICreatedAtUpdatedAt {
  day: number
  month: number
  year: number
}
// объект графика питания
interface ISchedule {
    id: number
    title: string
    modeRegime: IModeRegime
    createdAt: ICreatedAtUpdatedAt
    updatedAt: ICreatedAtUpdatedAt
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
        //!если добавлять минуты '8:23', то  искажается. Ведь, интервал между таблетками и едой, становиться разный, мы ведь фикисруем только час или пол часа
        // обязательно округленно, либо ..30, либо ...00, иначе: ...23 < 0 и интервалы начнут гулятьы 
        firstMeal: {hour: 8, minute: 0}, // 8:00  - объект, чтобы распарсить и установить в currenDate
        lastMeal: {hour: 22, minute: 0}, // 22:00
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: {hour: 9, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 22, minute: 0},
      },
    },
    createdAt: {day: 20, month: 3, year: 2024}, // объект, чтобы распарсить и установить в currenDate
    updatedAt: {day: 20, month: 3, year: 2024}, // user может изменять начало курса (приёма пищи)
  },
  {
    id: 2,
    title: 'режим питания другого пользователя',
    modeRegime: {
      weekdays: {
        id: 2,
        firstMeal: {hour: 7, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 20, minute: 0},
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: {hour: 9, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 20, minute: 0},
      },
    },
    createdAt: {day: 12, month: 1, year: 2024},
    updatedAt: {day: 12, month: 1, year: 2024},
  },

]

export default mealSchedule;