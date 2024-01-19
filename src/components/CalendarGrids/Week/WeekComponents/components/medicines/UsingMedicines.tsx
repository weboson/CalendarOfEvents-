//! приём лекарств
import { Moment } from 'moment';
import { FC } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
// иконка
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import DependingEating from './medComponents/DependingEating';
import DependingBreakfast from './medComponents/DependingBreakfast';
import DependingSupper from './medComponents/DependingSupper';

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
      // приём ЛС не имеет зависимостей (просто количество приёма ЛС делиться на интервал между 1-м и последним ПП)
      // логика схожа с MealSchedule.tsx
      dayItem.day() !== 6 && dayItem.day() !== 0
        ? // weekday
          (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
            halfHourItem.minute() - firstMealWeekdays.minute() >= 0 && // 8:30 - 8:16 >= 0  and < 30
            halfHourItem.minute() - firstMealWeekdays.minute() < 30 && ( // 8:30 - 8:16 < 0  and < 30
              <div>
                <RiMedicineBottleLine
                  style={{
                    color: 'red',
                    position: 'absolute',
                    float: 'left',
                    bottom: '0',
                    left: '0',
                  }}
                />
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    position: 'absolute',
                    float: 'left',
                    bottom: '0',
                    left: '16px',
                  }}
                >
                  {' '}
                  Независимо
                </span>{' '}
              </div>
            )) ||
            [...new Array(med.quantity)].map((_, index) =>
              halfHourItem.isSame(
                firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                'hour',
              ) &&
              firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
                halfHourItem.minute() >=
                0 &&
              firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
                halfHourItem.minute() <
                30 ? (
                <div key={index + 1}>
                  <RiMedicineBottleLine
                    key={`regardless=${index}`}
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      bottom: '0',
                      left: '16px',
                    }}
                  >
                    {' '}
                    Независимо
                  </span>{' '}
                </div>
              ) : null,
            )
        : // weekend
          (halfHourItem.isSame(firstMealWeekend, 'hour') &&
            halfHourItem.minute() - firstMealWeekend.minute() >= 0 && // 8:30 - 8:16 >= 0  and < 30
            halfHourItem.minute() - firstMealWeekend.minute() < 30 && ( // 8:30 - 8:16 < 0  and < 30
              <div>
                <RiMedicineBottleLine
                  style={{
                    color: 'red',
                    position: 'absolute',
                    float: 'left',
                    bottom: '0',
                    left: '0',
                  }}
                />
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    position: 'absolute',
                    float: 'left',
                    bottom: '0',
                    left: '16px',
                  }}
                >
                  {' '}
                  Независимо
                </span>{' '}
              </div>
            )) ||
            [...new Array(med.quantity)].map((_, index) =>
              halfHourItem.isSame(
                firstMealWeekend.add(betweenMealsWeekend, 's'),
                'hour',
              ) &&
              firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
                halfHourItem.minute() >=
                0 &&
              firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
                halfHourItem.minute() <
                30 ? (
                <div key={index + 1}>
                  <RiMedicineBottleLine
                    key={`regardless=${index + 3}`}
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      bottom: '0',
                      left: '16px',
                    }}
                  >
                    {' '}
                    Независимо
                  </span>{' '}
                </div>
              ) : null,
            )
    );
  }
};

export default UsingMedicines;
