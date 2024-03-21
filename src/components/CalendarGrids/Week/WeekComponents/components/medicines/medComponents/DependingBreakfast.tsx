//! Приём Лекарств зависит ПЕРВОГО приёма пищи (до/вовремя/после)
// case: 'first breakfast'    ---  takingMedications[0].action: waysUsing[1]
import { Moment } from 'moment';
import { FC } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import HelperWarningMarker from './helper/HelperWarningMarker';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  firstMealWeekend: Moment;
  med: ITakingMedication;
  currentDayForWirning: boolean;
  currentDate: Moment;
}

const DependingBreakfast: FC<IProps> = ({
  dayItem,
  halfHourItem,
  firstMealWeekdays,
  firstMealWeekend,
  med,
  currentDayForWirning,
  currentDate,
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
                <>
                  {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      top: '18px',
                    }}
                  />
                  <span>
                    {/*//! вариант с названием ЛС {`${med.interval.format('H:mm')} ${med?.title}`} */}
                    {med.interval.format('H:mm')} до завтрака
                  </span>
                  <br />
                </>
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
                   {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <span>{med.interval.format('H:mm')} до завтрака</span>
                  <br />
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
                   {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <span>Вовремя завтрака</span>
                  <br />
                </>
              )
          : // weekend
            halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <span>Вовремя завтрака</span>
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
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <span>{med.interval.format('H:mm')} после завтрака</span>
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
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <span>{med.interval.format('H:mm')} после завтрака</span>
                </>
              )
      );
      break;

    default:
      break;
  }
};

export default DependingBreakfast;
