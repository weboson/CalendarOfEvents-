//! Промежуток времени между 1-м и последним приёмом пищи: 2 вида режима: в будни и в выходные
import { Moment } from 'moment';
import { FC } from 'react';
// Icons
import { GoSun } from 'react-icons/go'; // sun
import { BsMoon } from 'react-icons/bs'; // Moon
// база данных 
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule'; // first & last Meal
import { stylesMoon, stylesSun } from '../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const SpaceBetweenMeals: FC<IProps> = ({ dayItem, halfHourItem }) => {
  // Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const diet = mealSchedule[0].modeRegime; // режим дня

  return (
    <>
      {/* at weekday */}
      {/* // .isSameOrAfter/.isSameOrBefore аналог >=/<= (оставлю два варианта))  */}
      {dayItem.day() !== 6 && dayItem.day() !== 0 ? (
        halfHourItem.isSame(diet.weekdays.firstMeal, 'minute') || // иначе на 30 мин позже маркирует
        halfHourItem.isSameOrAfter(diet.weekdays.firstMeal) && // 8:00 >= 8:00 (weekdays)
        halfHourItem.isSameOrBefore(diet.weekdays.lastMeal) ? ( // 8:00 <= 22:00
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        ) // marking "weekend"
      ) : dayItem.day() == 6 || dayItem.day() == 0 ? (
        halfHourItem.isSame(diet.weekend.firstMeal, 'minute') || // иначе на 30 мин позже маркирует
        halfHourItem >= diet.weekend.firstMeal && 
        halfHourItem <= diet.weekend.lastMeal ? (
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        )
      ) : null}
    </>
  );
};

export default SpaceBetweenMeals;
