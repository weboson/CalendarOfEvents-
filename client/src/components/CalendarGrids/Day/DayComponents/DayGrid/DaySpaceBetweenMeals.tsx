//! График питания - Промежуток времени между 1-м и последним приёмом пищи: 2 вида режима: в будни и в выходные
// (как в Week () только вместо dayItem меняющийся (в меню < ToDay >) currentDate)
import { FC, useMemo } from 'react';
import { Moment } from 'moment';
import { GoSun } from 'react-icons/go';
import { BsMoon } from 'react-icons/bs';
import { stylesMoon, stylesSun } from '../../stylesDayGrid/sc_DayGrid';
import { mealSchedule } from '../../../../../data/localDataBase/localDB_MealSchedule';

interface IProps {
  halfHourItem: Moment;
  currentDate: Moment;
}

const DaySpaceBetweenMeals: FC<IProps> = ({ halfHourItem, currentDate }) => {
  // Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
  // режим дня (icon son/moon): промежуток между 1 приём пищи и последним
  // Не имеет ограничение по дате
  // установка времени относительно изменяющему currenDate (useMemo, чтобы постоянно не устанавливать время)
  //weekday
  const firstMealWeekdays = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule.weekday[0],
        })
        .clone(),
    [currentDate],
  );

  const lastMealWeekdays = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule.weekday[1],
        })
        .clone(),
    [currentDate],
  );
  //weekend
  const firstMealWeekend = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule.weekend[0],
        })
        .clone(),
    [currentDate],
  );

  const lastMealWeekend = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule.weekend[1],
        })
        .clone(),
    [currentDate],
  );

  return (
    <>
      {/* at weekday */}
      {/* //* .isSameOrAfter/.isSameOrBefore аналог оперторы >=/<= (оставлю два варианта))  */}
      {currentDate.day() !== 6 && currentDate.day() !== 0 ? (
        halfHourItem.isSame(firstMealWeekdays, 'minute') || // || - иначе на 30 мин позже маркирует
        (halfHourItem.isSameOrAfter(firstMealWeekdays) && // 8:00 >= 8:00 (weekdays)
          halfHourItem.isSameOrBefore(lastMealWeekdays)) ? ( // 8:00 <= 22:00
          <GoSun style={stylesSun} size={28} />
        ) : (
          <BsMoon style={stylesMoon} size={28} />
        ) // "weekend"
      ) : currentDate.day() == 6 || currentDate.day() == 0 ? (
        halfHourItem.isSame(firstMealWeekend, 'minute') || // || - иначе на 30 мин позже маркирует
        (halfHourItem >= firstMealWeekend &&
          halfHourItem <= lastMealWeekend) ? (
          <GoSun style={stylesSun} size={28} />
        ) : (
          <BsMoon style={stylesMoon} size={28} />
        )
      ) : null}
    </>
  );
};

export default DaySpaceBetweenMeals;
