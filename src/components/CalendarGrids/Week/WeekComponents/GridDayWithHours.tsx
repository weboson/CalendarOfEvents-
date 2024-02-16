//! вертикальный столбик по пол часа на определенный день (datyItem)
import { FC } from 'react';
import { Moment } from 'moment';
// sc_styles
import { HourContent } from '../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';
import SpaceBetweenMeals from './components/SpaceBetweenMeals'; // график питания: первый и последний приём пищи
// import UsingMedicines from './components/medicines/UsingMedicines';
import MealSchedule from './components/MealSchedule';
import UsingMedicines from './components/medicines/UsingMedicines';
import takingMedications from '../../../../data/localDataBase/LocalDB_WaysUsing';
import MyModal from '../../../myModal/MyModal';

// types
interface IProps {
  currentDate: Moment;
  dayItem: Moment;
}


const GridDayWithHours: FC<IProps> = ({ currentDate, dayItem }) => {
  // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
  const ArrayHalfHoursContent = [...new Array(48)].map((_, i) =>
    currentDate
      .startOf('day')
      .clone()
      .add(i * 30, 'm'),
  );

  //* Пример логики: чтобы искать нужный объект режима дня, по его id
  // let arr = dailyRegimes.find((item, index) => item.id == 2)
  // console.log(arr)


//! выбираем самы большое число из всех элементов массива "takingMedications" у свойства "quantity"(количество приёмом ЛС): 7 раз/день: еда 
 const maxMealFood = takingMedications.reduce(function(prev, current) {
  if (+current.quantity > +prev.quantity) {
      return current;
  } else {
      return prev;
  }
}); 
// console.log(maxMealFood) // {... .quantity, }


  return (
    ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
      <HourContent
        key={hourIndex + 3}
        $currentHour={
          // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 маркировка только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
          halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
          moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
          dayItem.isSame(moment(), 'day') // current Day'
        }
        // id for autoScrolling at the current hour
        id={halfHourItem.isSame(moment(), 'hour') ? 'autoScroll' : ''} // scroll in Home.tsx
      >
        {/* //* icons Sun & Moon (space between firs и last eating)*/}
        {/* data: localDB_MealSchedule.ts */}
        <SpaceBetweenMeals dayItem={dayItem} halfHourItem={halfHourItem} />
  
        {/* //* icons Food (firs и last eating)*/}
        {/* data: localDB_MealSchedule.ts */}
        <MealSchedule dayItem={dayItem} halfHourItem={halfHourItem}  med={maxMealFood}/>
        
  
        {/* //* for Using Medicines (расчет приёма лекарств) */}
        {takingMedications.map((medItem, index) => (
          <UsingMedicines key={index} dayItem={dayItem} halfHourItem={halfHourItem} med={medItem}/>
        ))}
        
        {/* модальное окно (блок находиться в ячейке, только он сдвинут вверх, и конечно скрыт*/}
         {/* <MyModal/> */}
      </HourContent>
    ))
  )
};

export default GridDayWithHours;
