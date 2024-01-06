import {FC} from 'react';
import { RiMedicineBottleLine } from "react-icons/ri";
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
import { Moment } from 'moment';
import { MdOutlineFastfood } from 'react-icons/md';
import { stylesFood } from '../../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: any
}

const UsingMedicines: FC<IProps> = ({dayItem, halfHourItem, med}) => {

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
const betweenMealsWeekend = Math.floor(diffIntervalMealWeekend / (med.quantity-1)) 

// ! создать отдельный файл (либо в беке либо во фронте) и передавать объектом


  return (
    (dayItem.day() !== 6 && dayItem.day() !== 0) ? 
    (halfHourItem.isSame(firstMealWeekdays.subtract(med.interval.minute(), 'minute').subtract(med.interval.hour(), 'hour'), 'hour')) && 
    (
      firstMealWeekdays.clone().minute() - halfHourItem.minute()   >= 0 && // 22:30 - 22:21 >= 0  and < 30
      firstMealWeekdays.clone().minute() - halfHourItem.minute()  < 30 && 
       (<RiMedicineBottleLine  style={{color: "red"}}/>)
    ) 
    || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
    ([...new Array(med.quantity-1)].map((_, index) => (
      (halfHourItem.isSame(firstMealWeekdays.add(betweenMealsWeekdays, 's'), 'hour')) &&
      firstMealWeekdays.clone().minute() - halfHourItem.minute()   >= 0 && // 22:30 - 22:21 >= 0  and < 30
      firstMealWeekdays.clone().minute() - halfHourItem.minute()  < 30 && 
      (<RiMedicineBottleLine  style={{color: "red"}}/>)
    )))

    : null



  );
};

export default UsingMedicines;