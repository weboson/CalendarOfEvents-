//* Локальная База Данных "mealSchedule" - имеет два варианта weekday и weekend
//! mealSchedule - график питания - первый и последний приём пищи
// пока база данных будет храниться локально (и пока без user):
import moment, { Moment } from "moment"


// свойства выходных или будней
interface IWeek {
  id: number
  firstMeal: object
  lastMeal: object
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
        //!если добавлять минуты (minute(25)), то  искажается. Ведь, интервал между таблетками и едой, становиться разный, мы ведь фикисруем только час или пол часа
        // .minute(0) обязательно, иначе при сравнении будет: ...minute() < 0
        firstMeal: {hour: 8, minute: 0}, // 8:00  
        lastMeal: {hour: 20, minute: 0}, // 22:00
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: {hour: 9, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 22, minute: 0},
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
        firstMeal: {hour: 7, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 20, minute: 0},
      },
      weekend: { // по-умолчанию схож с weekdays, но user может изменить
        id: 3,
        firstMeal: {hour: 9, minute: 0}, // советуется бодровстовать 14-16 часов
        lastMeal: {hour: 20, minute: 0},
      },
    },
    createdAt: '12.12.2023',
    updatedAt: '14.12.2023',
  },

]


export default mealSchedule;