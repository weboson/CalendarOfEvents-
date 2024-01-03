import { Moment } from 'moment';
import { FC } from 'react';
// данные: инфа оприёме ЛС
import takingMedications from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
// иконка 
import { RiMedicineBottleLine } from "react-icons/ri";
import { MdOutlineFastfood } from 'react-icons/md';
import { stylesFood } from '../../../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';

// Logic

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: any
}




const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med }) => {

//* weekday
// приёмы пищи:
// 1-й приём пищи
const firstMealWeekdays = mealSchedule[0].modeRegime.weekdays.firstMeal.clone() // обз clone() иначе изменим исходник
// последний приём пищи
const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone()

//* weekend
const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone() // обз clone() иначе изменим исходник
const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone()

//* интервал (промежуточные приёмы пищи)
// время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
const diffIntervalMealWeekdays = lastMealWeekdays.diff(firstMealWeekdays, 'second') // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
//console.log(diffIntervalMealWeekdays) // 50400000
// интервал времени / количество приёма ЛЕкарств                      
// -1 потому что (в начале завтрак -1)
const betweenMealsWeekdays = (diffIntervalMealWeekdays / (med.quantity-1)) // 50400000(~14 ч) / 3-1раз/день = 3.5 часа - 
//console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)
// ! создать отдельный файл (либо в беке либо во фронте) и передавать объектом



// type
interface IDistribution {
  halfHourItem: Moment
  depending: boolean
  action: string
  quantity: number
  position: string
  interval: number
  firstEat: Moment
}



// распределение(текущая_клетка, в_зависимости, тощак/еда/завтрак/ужин/сон, сколько_раз/день, до/вовремя/после, интервальное_время, firstEat)
const distribution = (halfHourItem, depending, action, quantity, position, interval, firstEat) => {
  
  
  if (depending) {  // в зависимости
    switch (action) {

      //* от приёма пищи
      case 'eating':
      for(let i=1; i<=quantity; i++) { // количество приёма раз/день
          // до/вовремя/после
          switch (position) {
            case 'before': // до
            // exmp: 9:00 - 45 = 8:15 
            halfHourItem.isSame(halfHourItem - interval, 'minute') && halfHourItem.isSame(halfHourItem - interval, 'hour') &&
            <RiMedicineBottleLine style={{color: 'red'}}/>
          
          break;
            case 'while': // вовремя
            
              break;
            case 'after': // после
            
              break;
            default:
              break;
          }
        }
        break;
        
     //* от 1-го завтрака
     case 'first breakfast':
      // до(натощак)/вовремя/после
      switch (position) {
        case 'before': // до
          
          break;
        case 'while': // вовремя
        
          break;
        case 'after': // после
        
          break;
        default:
          break;
      }
      break;

      //* от last ужина
     case 'last supper':
      // до/вовремя/после
      switch (position) {
        case 'before': // до
          
          break;
        case 'while': // вовремя
        
          break;
        case 'after': // после
        
          break;
        default:
          break;
      }
      break;

    //* перед сном
    case 'sleep':
      break;

      default:
        break;
    }
  }
}


  return (
    <>

        { dayItem.day() !== 6 && dayItem.day() !== 0 && distribution(halfHourItem, med.depending, med.action, med.quantity, med.position, med.interval, firstEat)
        //  (med.isRegardlessOfFood) ?  // есть ли зависимость приёма ЛС от чего либа (еда, завтрак, ужин, сон)
        //  // количество приёма ЛС/сутки
        //   [new Array(med.quantity)].map(() => ( 
        //         // полчаса == (1еда.add(+спустя45минут)), час)
        //         (halfHourItem.isSame(startingDay.add(med.interval, 'm'), 'hour') && 
        //         halfHourItem.minute()  >= startingDay.add(med.interval, 'm').minute() && 
        //         halfHourItem.minute() != 0) ? 
        //         <RiMedicineBottleLine style={{color: 'red'}}/> : null    
        //   ))  : null  

        }
 
    </>
  );
};

export default UsingMedicines;
