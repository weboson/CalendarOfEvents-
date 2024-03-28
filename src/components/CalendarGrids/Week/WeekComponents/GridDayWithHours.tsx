//! КАЖДЫЙ СТОЛБИК (их всего 7) ячеек (48шт) - по пол часа на определенный день (datyItem)
import { FC, memo, useMemo } from 'react';
import { Moment } from 'moment';
// sc_styles
import { HourContent } from '../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';
import SpaceBetweenMeals from './components/SpaceBetweenMeals'; // график питания: первый и последний приём пищи
// import UsingMedicines from './components/medicines/UsingMedicines';
import MealSchedule from './components/MealSchedule';
import { MemoUsingMedicines } from './components/medicines/UsingMedicines';
// DataBase array
import recipesMedications from '../../../../data/localDataBase/LocalDB_WaysUsing';
// Redux-Toolkit для получения данных состояния (идникатор для WarnigMarker)
import { useAppSelector } from '../../../../store/hooks';

interface IProps {
  currentDate: Moment;
  dayItem: Moment;
}

const GridDayWithHours: FC<IProps> = ({ currentDate, dayItem }) => {
  // console.log('GridDayWithHours')

  // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
  const ArrayHalfHoursContent = useMemo(() => (
    [...new Array(48)].map((_, i) =>
    currentDate
      .startOf('day')
      .clone()
      .add(i * 30, 'm'),
  )), [currentDate])

  //* Пример логики: чтобы искать нужный объект режима дня, по его id
  // let arr = dailyRegimes.find((item, index) => item.id == 2)
  // console.log(arr)

// выбираем самый большое число из всех элементов массива "takingMedications" у свойства "quantity"(количество приёмом ЛС): 7 раз/день: еда 
 const maxMealFood = useMemo(() => (
  recipesMedications.reduce(function(prev, current) {
    if (+current.quantity > +prev.quantity) {
        return current;
    } else {
        return prev;
    }
  })
 ), [recipesMedications])

  //! WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
  // учавствуют: WeekGrid.tsx, DependingBreakfast, DependingEating etc ... , HelperWarningMarker.tsx
  const warningMarker = useAppSelector((state) => state.markerWarning); // общий индикатор
  // текущий день, для Warning
  const currentDayForWirning = useMemo(()=> (dayItem.isSame(moment(), 'day')), [dayItem]);  
  
  return (
    ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
      <HourContent 
        key={hourIndex + 3}
        $currentHour={
          // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 маркировка только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
          halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
          moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
          dayItem.isSame(moment(), 'day') && // current day
          (!warningMarker) // не время приёма лекарства
        }
        $currentWarning={
          //! маркировка (пульсация) Warning
          halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
          moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
          dayItem.isSame(moment(), 'day') && // current day
          (warningMarker) // время приёма лекарства
        }
        // id for autoScrolling at the current hour
        id={halfHourItem.isSame(moment(), 'hour') ? 'autoScroll' : ''} // scroll in Home.tsx
      >
        {/* //* icons Sun & Moon (space between firs и last eating)*/}
        {/* data: localDB_MealSchedule.ts */}
        <SpaceBetweenMeals dayItem={dayItem} halfHourItem={halfHourItem} currentDate={currentDate}/>
  
        {/* //* icons Food (firs и last eating)*/}
        {/* data: localDB_MealSchedule.ts */}
        <MealSchedule dayItem={dayItem} halfHourItem={halfHourItem}  maxmealfood={maxMealFood} currentDate={currentDate}/>
        
  
        {/* //* for Using Medicines (расчет приёма лекарств) */}
        {/* {recipesMedications.map((medItem, index) => (
          <MemoUsingMedicines key={index} dayItem={dayItem} halfHourItem={halfHourItem} med={medItem} currentDayForWirning={currentDayForWirning} currentDate={currentDate}/>
        ))} */}
      </HourContent>
    ))
  )
};

export const MemoGridDaysHours = memo(GridDayWithHours); // memo, чтобы один раз столбик расчитался, а потом уже 6 раз из памяти рендерился

