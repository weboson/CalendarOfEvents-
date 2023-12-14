//* Локальная База Данных Daily Regime 
// Daily Regime - режим дня - проснулся в такое время, лег спать в такое время
// пока база данных будет храниться локально (и пока без user):


import moment, { Moment } from "moment"

// массив объектов
interface IDaily {
    id: number
    title: string
    modeDR: 'weekdays' | 'weekends' // 'будни' | 'выходные'
    startDay: Moment | string // попробую тип Moment. Не уверен: Moment || string => Moment
    endDay: Moment | string // попробую тип Moment. Не уверен: Moment || string => Moment
    CreateDateColumn: Moment | string
    UpdateDateColumn: Moment | string
  }
  
  interface IDailyRegime extends Array<IDaily>{}


// режим дня 
const dailyRegime: IDailyRegime = [
  {
    id: 1,
    title: 'ежедневный', // любой заголовок
    modeDR: 'weekdays', // 'будни' | 'выходные'
    startDay: moment().hour(8 - 1).minute(30), // во сколько просыпаешься (10:30)
    endDay: moment().hour(20 - 1).minute(0), // + 14-16 часа бодростования и после спать
    CreateDateColumn: '12.12.2023',
    UpdateDateColumn: '12.12.2023',
  },
];


export default dailyRegime;