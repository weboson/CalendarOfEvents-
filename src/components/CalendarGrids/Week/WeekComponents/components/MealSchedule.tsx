//! Режим питания:  Маркировка моментов приёма пищи в таблице времени и дней
//! Планирую добавить функциональность: 2 вида: в будни и выходные (также как и режимы дня)
import { FC } from 'react';
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule';
import { MdOutlineFastfood } from 'react-icons/md';
import { Moment } from 'moment';
import { stylesFood } from '../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const MealSchedule: FC<IProps> = ({ halfHourItem, dayItem }) => {
  // первый приём пищи
// weekday
const firstMealWeekdays = mealSchedule[0].modeRegime.weekdays.firstMeal.clone() // обз clone() иначе изменим исходник
const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone()

// weekend
const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone() // обз clone() иначе изменим исходник
const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone()
  return (
    <>
      { //weekday
        (dayItem.day() !== 6 && dayItem.day() !== 0) ? 
          (
            halfHourItem.isSame(firstMealWeekdays, 'hour')) && 
          (
            firstMealWeekdays.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
            firstMealWeekdays.minute() - halfHourItem.minute() < 30 && (<MdOutlineFastfood style={stylesFood}/>)
          ) || 
          (
            halfHourItem.isSame(lastMealWeekdays, 'hour')) &&
            (
              lastMealWeekdays.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
              lastMealWeekdays.minute() - halfHourItem.minute() < 30 && (<MdOutlineFastfood style={stylesFood}/>)
            )
          : 
          // weekend
          (
            halfHourItem.isSame(firstMealWeekend, 'hour')) && 
          (
            firstMealWeekend.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
            firstMealWeekend.minute() - halfHourItem.minute() < 30 && (<MdOutlineFastfood style={stylesFood}/>)
          ) || 
          (
            halfHourItem.isSame(lastMealWeekend, 'hour')) &&
            (
              lastMealWeekend.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
              lastMealWeekend.minute() - halfHourItem.minute() < 30 && (<MdOutlineFastfood style={stylesFood}/>)
            )
        
          

              
      }
    </>
  );
};

export default MealSchedule;
