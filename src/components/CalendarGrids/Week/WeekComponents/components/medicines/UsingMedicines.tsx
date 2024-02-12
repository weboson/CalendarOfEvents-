//! приём лекарств
import { Moment } from 'moment';
import { FC } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import DependingEating from './medComponents/DependingEating';
import DependingBreakfast from './medComponents/DependingBreakfast';
import DependingSupper from './medComponents/DependingSupper';
import InDependently from './medComponents/InDependently';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: ITakingMedication | null;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med }) => {
  // weekday
  const firstMealWeekdays = mealSchedule[0].modeRegime.weekdays.firstMeal.clone(); // обз clone() иначе изменим исходник
  const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone();

  const diffIntervalMealWeekdays = lastMealWeekdays.diff(firstMealWeekdays, 'seconds',); 
  const betweenMealsWeekdays = diffIntervalMealWeekdays / (med.quantity - 1);

  // weekend
  const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone(); // обз clone() иначе изменим исходник
  const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone();
  const diffIntervalMealWeekend = lastMealWeekend.diff(firstMealWeekend,'seconds',);
  const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);


  if (med.depending) {
    //==================================== есть ли зависимости от завтрака/ужина/еды/
    //* если есть, то какая (еда, завтрак, ужин)?
    switch (med.action.type) {
      // ---------------------------------
      case 'eating': // =====================================от еды
        //* до, вовремя или после
        return (
          <DependingEating
            dayItem={dayItem}
            halfHourItem={halfHourItem}
            firstMealWeekdays={firstMealWeekdays}
            betweenMealsWeekdays={betweenMealsWeekdays}
            firstMealWeekend={firstMealWeekend}
            betweenMealsWeekend={betweenMealsWeekend}
            med={med}
          />
        );
        break;

      // ---------------------------------
      case 'first breakfast': //============================= от первого завтрака
          return (
            <DependingBreakfast
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              firstMealWeekdays={firstMealWeekdays}
              firstMealWeekend={firstMealWeekend}
              med={med}
            />
          )

        break;
      // ---------------------------------
      case 'last supper': //================================= от последнего ужина
      return (
        <DependingSupper
          dayItem={dayItem}
          halfHourItem={halfHourItem}
          lastMealWeekdays={lastMealWeekdays}
          lastMealWeekend={lastMealWeekend}
          med={med}
        />
      )
        break;

      // ---------------------------------
      default:
        break;
    }
  } else {
    //======================================================= ВНЕ ЗАВИСИМОСТИ ОТ ЕДЫ
    return (
      <InDependently
        dayItem={dayItem}
        halfHourItem={halfHourItem}
        firstMealWeekdays={firstMealWeekdays}
        betweenMealsWeekdays={betweenMealsWeekdays}
        firstMealWeekend={firstMealWeekend}
        betweenMealsWeekend={betweenMealsWeekend}
        med={med}
      />
    );
  }
};

export default UsingMedicines;
