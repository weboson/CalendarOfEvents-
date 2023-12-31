//! Режим дня/сна: 2 вида режима: в будни и в выходные
import { Moment } from 'moment';
import { FC } from 'react';
// Icons
import { GoSun } from 'react-icons/go'; // sun
import { BsMoon } from 'react-icons/bs'; // Moon
// база данных
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule';
import { stylesMoon, stylesSun } from '../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const MealSchedule: FC<IProps> = ({ dayItem, halfHourItem }) => {
  // Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const diet = mealSchedule[0].modeRegime; // режим дня

  return (
    <>
      {/* at weekday */}
      {dayItem.day() !== 6 && dayItem.day() !== 0 ? (
        halfHourItem.hour() >= diet.weekdays.firstMeal.hour() && // 8:00 >= 8:00 (weekdays)
        halfHourItem.hour() <= diet.weekdays.lastMeal.hour() ? ( // 8:00 <= 22:00
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        ) // marking "weekend"
      ) : dayItem.day() == 6 || dayItem.day() == 0 ? (
        halfHourItem.hour() >= diet.weekend.firstMeal.hour() && 
        halfHourItem.hour() <= diet.weekend.lastMeal.hour() ? (
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        )
      ) : null}
    </>
  );
};

export default MealSchedule;
