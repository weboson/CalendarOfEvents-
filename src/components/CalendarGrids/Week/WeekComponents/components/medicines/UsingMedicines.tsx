// import { Moment } from 'moment';
// import { FC } from 'react';
// // данные: инфа оприёме ЛС
// import takingMedications from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
// // данные графика питания: first and last eating
// import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
// // иконка 
// import { RiMedicineBottleLine } from "react-icons/ri";
// import { MdOutlineFastfood } from 'react-icons/md';
// import { stylesFood } from '../../../stylesWeekGrid/sc_WeekGrid';

// // Logic

// interface IProps {
//   dayItem: Moment;
//   halfHourItem: Moment;
// }

// const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem }) => {



  
// // выберем экземляр массива, где вся инфа об употреблении конкретного ЛС:
// const med = takingMedications[0]



// // получили end(ужин) - start(завтрак) = время бодровствования 14 часов (в будни)
// const diffIntervalMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.diff(mealSchedule[0].modeRegime.weekdays.firstMeal, 'hour'); // график питания в weekday
// const betweenMealsWeekdays = Math.floor(diffIntervalMealWeekdays / med.quantity) // окрулить вниз(время бодровствоания / количесвто приёма ЛС) 
// const diffIntervalMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.diff(mealSchedule[0].modeRegime.weekend.firstMeal, 'hour'); // график питания в weekend
// const betweenMealsWeekend = Math.floor(diffIntervalMealWeekend / med.quantity) // окрулить вниз(время бодровствоания / количесвто приёма ЛС) 



// // type
// interface IDistribution {
//   halfHourItem: Moment
//   depending: boolean
//   action: string
//   quantity: number
//   position: string
//   interval: number
//   firstEat: Moment
// }



// // распределение(текущая_клетка, в_зависимости, тощак/еда/завтрак/ужин/сон, сколько_раз/день, до/вовремя/после, интервальное_время, firstEat)
// const distribution = (halfHourItem, depending, action, quantity, position, interval, firstEat) => {
  
  
//   if (depending) {  // в зависимости
//     switch (action) {

//       //* от приёма пищи
//       case 'eating':
//       for(let i=1; i<=quantity; i++) { // количество приёма раз/день
//           // до/вовремя/после
//           switch (position) {
//             case 'before': // до
//             // (halfHourItem.isSame(firstEat, 'hour') && 
//             // firstEat.minute() - halfHourItem.minute() >= 0 && //exp: 15:30 - 15:00 >= 0 (true)
//             // firstEat.minute() - halfHourItem.minute() <= 30)  // 15:30 - 15:30 < 30 (true)
//             //   return (<MdOutlineFastfood key={i} style={stylesFood}/>) 
            
          
//           break;
//             case 'while': // вовремя
            
//               break;
//             case 'after': // после
            
//               break;
//             default:
//               break;
//           }
//         }
//         break;
        
//      //* от 1-го завтрака
//      case 'first breakfast':
//       // до(натощак)/вовремя/после
//       switch (position) {
//         case 'before': // до
          
//           break;
//         case 'while': // вовремя
        
//           break;
//         case 'after': // после
        
//           break;
//         default:
//           break;
//       }
//       break;

//       //* от last ужина
//      case 'last supper':
//       // до/вовремя/после
//       switch (position) {
//         case 'before': // до
          
//           break;
//         case 'while': // вовремя
        
//           break;
//         case 'after': // после
        
//           break;
//         default:
//           break;
//       }
//       break;

//     //* перед сном
//     case 'sleep':
//       break;

//       default:
//         break;
//     }
//   }
// }


//   return (
//     <>

//         { dayItem.day() !== 6 && dayItem.day() !== 0 && distribution(halfHourItem, med.depending, med.action, med.quantity, med.position, med.interval, firstEat)
//         //  (med.isRegardlessOfFood) ?  // есть ли зависимость приёма ЛС от чего либа (еда, завтрак, ужин, сон)
//         //  // количество приёма ЛС/сутки
//         //   [new Array(med.quantity)].map(() => ( 
//         //         // полчаса == (1еда.add(+спустя45минут)), час)
//         //         (halfHourItem.isSame(startingDay.add(med.interval, 'm'), 'hour') && 
//         //         halfHourItem.minute()  >= startingDay.add(med.interval, 'm').minute() && 
//         //         halfHourItem.minute() != 0) ? 
//         //         <RiMedicineBottleLine style={{color: 'red'}}/> : null    
//         //   ))  : null  

//         }
 
//     </>
//   );
// };

// export default UsingMedicines;
