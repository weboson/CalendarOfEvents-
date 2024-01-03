//! Режим питания:  Маркировка моментов приёма пищи в таблице времени и дней
//! Планирую добавить функциональность: 2 вида: в будни и выходные (также как и режимы дня)
import { FC } from 'react';
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule';
import { MdOutlineFastfood } from 'react-icons/md';
import { Moment } from 'moment';
import { stylesFood } from '../../stylesWeekGrid/sc_WeekGrid';
import takingMedications from '../../../../../data/localDataBase/LocalDB_WaysUsing';



interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: any
}

const MealSchedule: FC<IProps> = ({ halfHourItem, dayItem, med }) => {

//* weekday
// приёмы пищи:
// 1-й приём пищи
const firstMealWeekdays = mealSchedule[0].modeRegime.weekdays.firstMeal.clone() // обз clone() иначе изменим исходник
// последний приём пищи
const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone()

//* интервал (промежуточные приёмы пищи)
// время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
const diffIntervalMealWeekdays = lastMealWeekdays.diff(firstMealWeekdays, 'seconds') // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
//console.log(diffIntervalMealWeekdays) // 50400000
// интервал времени / количество приёма ЛЕкарств                      
// -1 потому что (в начале завтрак -1)
const betweenMealsWeekdays = (diffIntervalMealWeekdays / (med.quantity-1)) // 50400000(~14 ч) / 3-1раз/день = 3.5 часа - 
//console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)


//* weekend
// тоже самое только weekend
const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone() // обз clone() иначе изменим исходник
const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone()

const diffIntervalMealWeekend = lastMealWeekend.diff(firstMealWeekend, 'seconds')
const betweenMealsWeekend = (diffIntervalMealWeekend / (med.quantity-1)) 

// ! создать отдельный файл (либо в беке либо во фронте) и передавать объектом


  return (
    <>
      { //! Оптимальный код(где важен порядок и сравния), иначе при изменении минут в localDB_MealSchedule - могут пропасть приёмы пищи
      //weekday
        (dayItem.day() !== 6 && dayItem.day() !== 0) ? 
          (halfHourItem.isSame(firstMealWeekdays, 'hour')) && 
          (
            firstMealWeekdays.minute() - halfHourItem.minute()   >= 0 && // 22:30 - 22:21 >= 0  and < 30
            firstMealWeekdays.minute() - halfHourItem.minute()  < 30 && 
             (<MdOutlineFastfood style={stylesFood}/>)
          ) 
          || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
          ([...new Array(med.quantity)].map((_, index) => (
            //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
            (halfHourItem.isSame(firstMealWeekdays.add(betweenMealsWeekdays, 's'), 'hour')) && // схравнение по часу
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() - halfHourItem.minute() >= 0 &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() - halfHourItem.minute() < 30  ? // схравнение по минуте
            <MdOutlineFastfood key={index} style={stylesFood}/> : 
            null
            )))
          || 
          (halfHourItem.isSame(lastMealWeekdays, 'hour')) &&
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
          ) 
          || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
          ([...new Array(med.quantity)].map((_, index) => (
            //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
            (halfHourItem.isSame(firstMealWeekend.add(betweenMealsWeekend, 's'), 'hour')) &&  // схравнение по часу
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() - halfHourItem.minute() >= 0 &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() - halfHourItem.minute() < 30 ? // схравнение по минуте 

            <MdOutlineFastfood key={index} style={stylesFood}/> : 
            null
            )))
            || 
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
