import { Moment } from 'moment';
import { FC, useMemo } from 'react';
import { HalfHoursContent } from '../../stylesDayGrid/sc_DayGrid';
import moment from 'moment';
import TimeLine from './TimeLine';
// расчет режима дня (для Moon, Sun) - for DataBase
import DaySpaceBetweenMeals from './DaySpaceBetweenMeals';
// режим митания. icon food
import DayMealSchedule from './DayMealSchedule';
import recipesMedications from '../../../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  currentDate: Moment;
}

const ListDayHalfHours: FC<IProps> = ({ currentDate }) => {
  // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
  const ArrayHalfHoursContent = useMemo(
    () =>
      [...new Array(48)].map((_, i) =>
        currentDate
          .startOf('day')
          .clone()
          .add(i * 30, 'm'),
      ),
    [currentDate],
  );

    // для icons Food
  // выбираем самый большое (количество приёмов еды из рецептов) число из всех элементов массива "takingMedications" у свойства "quantity"(количество приёмом ЛС): 7 раз/день: еда
    const maxMealFood = useMemo( // для дочернего MealSchedule.tsx 
    () =>
      recipesMedications.reduce(function (prev, current) {
        if (+current.quantity > +prev.quantity) {
          return current;
        } else {
          return prev;
        }
      }),
    []
  );  

  const warningMarker = false;

  return ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
    <HalfHoursContent
      className="saveScrollDay"
      key={hourIndex + 3}
      $currentHalfHour={
        // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 маркировка только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
        moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
        !warningMarker // не время приёма лекарства
      }
        // id for autoScrolling at the current hour
        id={halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && 
        moment().minute() - halfHourItem.minute() >= 0 // проверим на текущий получас
        ? 'autoScroll' : ''} // scrolling in Home.tsx
    >
        {/* //! Временная ШКАЛА */}
        { // текущее время - для временной шкалы, как и с $currentHalfHour
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && 
        moment().minute() - halfHourItem.minute() >= 0 && // проверим на текущий получас
        <TimeLine currentDate={currentDate}/>}
      
      {/* //* icons Sun & Moon (space between firs и last eating)*/}
      {/* data: localDB_MealSchedule.ts */}
      <DaySpaceBetweenMeals halfHourItem={halfHourItem} currentDate={currentDate}/>
      <DayMealSchedule  halfHourItem={halfHourItem} currentDate={currentDate} maxmealfood={maxMealFood}/>
    </HalfHoursContent>
  ));
};

export default ListDayHalfHours;
