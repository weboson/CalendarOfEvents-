import { Moment } from 'moment';
import { FC } from 'react';
import { memo } from 'react';


// type
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';
import mealSchedule from '../../../../../../../data/localDataBase/localDB_MealSchedule';
import { firstMealWeekdays, firstMealWeekend } from '../UsingMedicines';
import moment from 'moment';

 

const DependingEatings:FC<IProps> = ({dayItem, halfHourItem, betweenMealsWeekdays, firstMealWeekdays,
  firstMealWeekend, betweenMealsWeekend, med}) => {
console.log('rememo')

//! если moment() здесь - то два раза не прибавляется, то есть 21600 = 6 часов
const a = moment().hour(8).minute(0).add(21600, 's') // 21600 = 6 часов = 
//! а если получить moment() через пропсы, то add запускается два раза и получаетсяя 21600 * 2 = 12 часов, то есть если было 8 часов, значит будет 20:00 часов
const b = firstMealWeekdays.clone().add(21600, 's') // 21600 * 2(потому что повторяется при переходе по пропсам - не знаю почему) = 6 часов 
// console.log(moment().set({'hour': 8, 'minute': 30}).format('LTS'))

let i = 10

    // return  <div>{a.format('H:mm:A')}{` ------ ${++i}`}</div> //8:00 => 14:00:47 PM ------ 11
    return  <div>{b.format('H:mm:A')}{` ------ ${++i}`}</div> //8:00 =>  20:00:47 PM ------ 11

};

export const DependingEating = memo(DependingEatings);