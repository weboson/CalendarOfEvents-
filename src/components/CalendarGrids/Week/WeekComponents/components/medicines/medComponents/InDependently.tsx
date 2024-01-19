import { Moment } from 'moment';
import { FC } from 'react';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  betweenMealsWeekdays: number;
  firstMealWeekend: Moment;
  betweenMealsWeekend: number;
  med: ITakingMedication | null;
}

const InDependently: FC<IProps> = ({
  dayItem,
  halfHourItem,
  firstMealWeekdays,
  betweenMealsWeekdays,
  firstMealWeekend,
  betweenMealsWeekend,
  med,
}) => {
  // нужен .clone() - иначе add и subtract будут дублировать свои выполнение, и вместо add(6 часов) получим add(12)
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();

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
};

export default InDependently;
