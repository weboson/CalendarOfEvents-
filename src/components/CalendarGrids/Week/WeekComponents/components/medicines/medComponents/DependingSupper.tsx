//! Приём Лекарств зависит от ПОСЛЕДНЕГО приёма пищи (до/вовремя/после)
// case: 'last supper'    ---  takingMedications[0].action: waysUsing[2]
import { Moment } from 'moment';
import { FC } from 'react';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  lastMealWeekdays: Moment;
  lastMealWeekend: Moment;
  med: ITakingMedication | null;
}

const DependingSupper: FC<IProps> = ({
  dayItem,
  halfHourItem,
  lastMealWeekdays,
  lastMealWeekend,
  med,
}) => {
  // нужен .clone() - иначе add и subtract будут дублировать своё выполнение
  lastMealWeekdays = lastMealWeekdays.clone();
  lastMealWeekend = lastMealWeekend.clone();

  switch (
    med.position // до/вовремя/после
  ) {
    case 'before': //! ДО ужина
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              lastMealWeekdays
                .subtract(med.interval.minute(), 'minute')
                .subtract(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              lastMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                      top: '18px',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                      top: '18px',
                    }}
                  >
                    {med.interval.format('H:mm')} до ужина
                  </span>
                </>
              )
          : // weekend
            halfHourItem.isSame(
              lastMealWeekend
                .subtract(med.interval.minute(), 'minute')
                .subtract(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekend.clone().minute() - halfHourItem.minute() < 30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                      top: '18px',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                      top: '18px',
                    }}
                  >
                    {med.interval.format('H:mm')} до ужина
                  </span>
                </>
              )
      );
      break;
    case 'while': //! ВОВРЕМЯ ужина
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(lastMealWeekdays, 'hour') &&
              lastMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                    }}
                  >
                    Вовремя ужина
                  </span>
                </>
              )
          : // weekend
            halfHourItem.isSame(lastMealWeekend, 'hour') &&
              lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekend.clone().minute() - halfHourItem.minute() < 30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                    }}
                  >
                    Вовремя ужина
                  </span>
                </>
              )
      );
      break;
    case 'after': //! ПОСЛЕ ужина
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              lastMealWeekdays
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              lastMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                      top: '18px',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                      top: '18px',
                    }}
                  >
                    {med.interval.format('H:mm')} после ужина
                  </span>
                </>
              )
          : // weekend
            halfHourItem.isSame(
              lastMealWeekend
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              lastMealWeekend.clone().minute() - halfHourItem.minute() < 30 && (
                <>
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      position: 'absolute',
                      float: 'left',
                      left: '0',
                      top: '18px',
                    }}
                  />
                  <span
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                      top: '18px',
                    }}
                  >
                    {med.interval.format('H:mm')} после ужина
                  </span>
                </>
              )
      );
      break;

    default:
      break;
  }
};

export default DependingSupper;
