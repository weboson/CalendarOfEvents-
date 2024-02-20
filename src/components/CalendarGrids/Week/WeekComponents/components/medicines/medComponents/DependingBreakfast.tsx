//! Приём Лекарств зависит ПЕРВОГО приёма пищи (до/вовремя/после)
// case: 'first breakfast'    ---  takingMedications[0].action: waysUsing[1]
import { Moment } from 'moment';
import { FC } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  firstMealWeekend: Moment;
  med: ITakingMedication;
}

const DependingBreakfast: FC<IProps> = ({
  dayItem,
  halfHourItem,
  firstMealWeekdays,
  firstMealWeekend,
  med,
}) => {
  // нужен .clone() - иначе add и subtract будут дублировать своё выполнение
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();

  switch (
    med.position // до/вовремя/после
  ) {
    case 'before': //! ДО завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .subtract(med.interval.minute(), 'minute')
                .subtract(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
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
                    // onMouseOver={(e) => hoverMouseOnMedicine(e)} 
                    // onMouseOut={(e) => hoverMouseOnMedicine(e)}
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      position: 'absolute',
                      float: 'left',
                      left: '16px',
                      top: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    {/*//! вариант с названием ЛС {`${med.interval.format('H:mm')} ${med?.title}`} */}
                    {med.interval.format('H:mm')} до завтрака
                  </span>
                </div>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .subtract(med.interval.minute(), 'minute')
                .subtract(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
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
                    {med.interval.format('H:mm')} до завтрака
                  </span>
                </>
              )
      );
      break;
    case 'while': //! ВОВРЕМЯ завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(firstMealWeekdays, 'hour') &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
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
                    Вовремя завтрака
                  </span>
                </>
              )
          : // weekend
            halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
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
                    Вовремя завтрака
                  </span>
                </>
              )
      );
      break;
    case 'after': //! ПОСЛЕ завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
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
                    {med.interval.format('H:mm')} после завтрака
                  </span>
                </>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
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
                    {med.interval.format('H:mm')} после завтрака
                  </span>
                </>
              )
      );
      break;

    default:
      break;
  }
};

export default DependingBreakfast;
