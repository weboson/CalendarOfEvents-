//! приём лекарств: каждая ячейка проверяет на соответсвие с каждым лекарством в массиве:
// 7 столбов * 48 получасов в день * 22 элментов в массиве рецептов = 1056
import { Moment } from 'moment';
import { FC, memo, useMemo } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule';
import { IRecipesMedication } from '../../../../../data/localDataBase/LocalDB_WaysUsing';
import DayDependingEating from './dayMedComponents/DayDependingEating';
import DayDependingBreakfast from './dayMedComponents/DayDependingBreakfast';
import DayDependingSupper from './dayMedComponents/DayDependingSupper';
import DayInDependently from './dayMedComponents/DayInDependently';
// import { useAppDispatch } from '../../../../../../store/hooks';
// import { readingPopupData } from '../../../../../../store/features/popupDataSlice';

interface IProps {
  halfHourItem: Moment;
  med: IRecipesMedication;
  currentDate: Moment;
}

const DayUsingMedicines: FC<IProps> = memo(
  ({ halfHourItem, med, currentDate }) => {
    // weekday: интервал между первым и последней едой
    const firstMealWeekdays = useMemo(
      () =>
        currentDate
          .set({
            hour: mealSchedule[0].modeRegime.weekdays.firstMeal.hour,
            minute: mealSchedule[0].modeRegime.weekdays.firstMeal.minute,
          })
          .clone(), // обз clone() иначе изменим исходник
      [currentDate],
    );

    const lastMealWeekdays = useMemo(
      () =>
        currentDate
          .set({
            hour: mealSchedule[0].modeRegime.weekdays.lastMeal.hour,
            minute: mealSchedule[0].modeRegime.weekdays.lastMeal.minute,
          })
          .clone(),
      [currentDate],
    );

    const diffIntervalMealWeekdays = useMemo(
      () => lastMealWeekdays.diff(firstMealWeekdays, 'seconds'),
      [firstMealWeekdays, lastMealWeekdays],
    );

    const betweenMealsWeekdays = useMemo(
      () => diffIntervalMealWeekdays / (med.quantity - 1),
      [diffIntervalMealWeekdays, med.quantity],
    );

    // weekend: интервал между первым и последней едой
    const firstMealWeekend = useMemo(
      () =>
        currentDate
          .set({
            hour: mealSchedule[0].modeRegime.weekend.firstMeal.hour,
            minute: mealSchedule[0].modeRegime.weekend.firstMeal.minute,
          })
          .clone(),
      [currentDate],
    ); // обз clone() иначе изменим исходник

    const lastMealWeekend = useMemo(
      () =>
        currentDate
          .set({
            hour: mealSchedule[0].modeRegime.weekend.lastMeal.hour,
            minute: mealSchedule[0].modeRegime.weekend.lastMeal.minute,
          })
          .clone(),
      [currentDate],
    );

    const diffIntervalMealWeekend = useMemo(
      () => lastMealWeekend.diff(firstMealWeekend, 'seconds'),
      [lastMealWeekend, firstMealWeekend],
    );
    const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);


    if (med.depending) {
      //==================================== есть ли зависимости от завтрака/ужина/еды/
      //* если есть, то какая (еда, завтрак, ужин)?
      switch (med.action) {
        // ---------------------------------
        case 'eating': // =====================================от еды
          //* до, вовремя или после
          return (
            <div
            //   onMouseOver={hoverMouseOnMedicine}
            //   onMouseOut={hoverMouseOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingEating
                halfHourItem={halfHourItem}
                firstMealWeekdays={firstMealWeekdays}
                betweenMealsWeekdays={betweenMealsWeekdays}
                firstMealWeekend={firstMealWeekend}
                betweenMealsWeekend={betweenMealsWeekend}
                med={med}
                currentDate={currentDate}
              />
            </div>
          );
          break;

        // ---------------------------------
        case 'first breakfast': //============================= от первого завтрака
          return (
            <div
            //   onMouseOver={hoverMouseOnMedicine}
            //   onMouseOut={hoverMouseOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingBreakfast
                halfHourItem={halfHourItem}
                firstMealWeekdays={firstMealWeekdays}
                firstMealWeekend={firstMealWeekend}
                med={med}
                currentDate={currentDate}
              />
            </div>
          );

          break;
        // ---------------------------------
        case 'last supper': //================================= от последнего ужина
          return (
            <div
            //   onMouseOver={hoverMouseOnMedicine}
            //   onMouseOut={hoverMouseOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingSupper
                halfHourItem={halfHourItem}
                lastMealWeekdays={lastMealWeekdays}
                lastMealWeekend={lastMealWeekend}
                med={med}
                currentDate={currentDate}
              />
            </div>
          );
          break;

        // ---------------------------------
        default:
          break;
      }
    } else {
      //======================================================= ВНЕ ЗАВИСИМОСТИ ОТ ЕДЫ
      return (
        <div
        //   onMouseOver={hoverMouseOnMedicine}
        //   onMouseOut={hoverMouseOnMedicine}
          style={{ cursor: 'help', maxWidth: 'fit-content' }}
        >
          <DayInDependently
            halfHourItem={halfHourItem}
            firstMealWeekdays={firstMealWeekdays}
            betweenMealsWeekdays={betweenMealsWeekdays}
            firstMealWeekend={firstMealWeekend}
            betweenMealsWeekend={betweenMealsWeekend}
            med={med}
            currentDate={currentDate}
          />
        </div>
      );
    }
  },
);

export default DayUsingMedicines; // memo, возможно быстрее будет загружатся лекарства в ячейке
