import { Moment } from 'moment';
import { FC } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  dayItem: Moment
  halfHourItem: Moment
  firstMealWeekdays: Moment
  betweenMealsWeekdays: number
  firstMealWeekend: Moment
  betweenMealsWeekend: number
  med: ITakingMedication | null
}

const DependingEating: FC<IProps> = ({
  dayItem,
  halfHourItem,
  firstMealWeekdays,
  betweenMealsWeekdays,
  firstMealWeekend,
  betweenMealsWeekend,
  med,
}) => {
  //! нужен .clone() - иначе add и subtract будут дулировать свои выполнение, и вместо add(6 часов) получим add(12)
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();
  
  return (
    // weekday
    // первый приём ЛС
    dayItem.day() !== 6 && dayItem.day() !== 0
      ? (halfHourItem.isSame(
          firstMealWeekdays
            .subtract(med.interval.minute(), 'minute')
            .subtract(med.interval.hour(), 'hour'),
          'hour',
        ) &&
          firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
          firstMealWeekdays.clone().minute() - halfHourItem.minute() < 30 && (
            <>
              <RiMedicineBottleLine style={{ color: 'red' }} />
              <span style={{ color: 'gray', fontSize: '14px' }}>
                {med.interval.format('H:mm')} ---до еды {med?.title}
              </span>
            </>
          )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
          [...new Array(med.quantity - 1)].map(
            (_, index) =>
              halfHourItem.isSame(
                firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                'hour',
              ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <div key={index}>
                  <RiMedicineBottleLine
                    key={`before-${index}`}
                    style={{ color: 'red' }}
                  />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    {med.interval.format('H:mm')} ---до еды {med?.title}
                  </span>
                </div>
              ),
          )
      : // weekend
        (halfHourItem.isSame(
          firstMealWeekend
            .subtract(med.interval.minute(), 'minute')
            .subtract(med.interval.hour(), 'hour'),
          'hour',
        ) &&
          firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
          firstMealWeekend.clone().minute() - halfHourItem.minute() < 30 && (
            <div>
              <RiMedicineBottleLine style={{ color: 'red' }} />
              <span style={{ color: 'gray', fontSize: '14px' }}>
                {med.interval.format('H:mm')}  ---до еды {med?.title}
              </span>
            </div>
          )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
          [...new Array(med.quantity - 1)].map(
            (_, index) =>
              halfHourItem.isSame(
                firstMealWeekend.add(betweenMealsWeekend, 's'),
                'hour',
              ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div key={index}>
                  <RiMedicineBottleLine
                    key={`before-${index}`}
                    style={{ color: 'red' }}
                  />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    {med.interval.format('H:mm')}  ---до еды {med?.title}
                  </span>
                </div>
              ),
          )
  );
};

export default DependingEating;
