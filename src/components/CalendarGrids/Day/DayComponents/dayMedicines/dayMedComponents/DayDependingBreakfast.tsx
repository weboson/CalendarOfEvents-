//! Приём Лекарств зависящая от ПЕРВОГО (завтрака) приёма пищи (до/вовремя/после)
// case: 'first breakfast'    ---  takingMedications[0].action: waysUsing[1]
import { Moment } from 'moment';
import { FC, memo } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { IRecipesMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { WrapperSpanDay } from '../../../stylesDayGrid/sc_DayGrid';

interface IProps {
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  firstMealWeekend: Moment;
  med: IRecipesMedication;
  currentDate: Moment;
}

const DayDependingBreakfast: FC<IProps> = memo(({
  halfHourItem,
  firstMealWeekdays,
  firstMealWeekend,
  med,
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
        currentDate.day() !== 6 && currentDate.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .subtract(med.interval.minute, 'minute')
                .subtract(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      top: '18px',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>
                    {`${med.title}`}
                  </WrapperSpanDay>
                  <br />
                </>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .subtract(med.interval.minute, 'minute')
                .subtract(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                   {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanDay>
                  <br />
                </>
              )
      );
      break;
    case 'while': //! ВОВРЕМЯ завтрака
      return (
        // weekday
        currentDate.day() !== 6 && currentDate.day() !== 0
          ? halfHourItem.isSame(firstMealWeekdays, 'hour') &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                   {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanDay>
                  <br />
                </>
              )
          : // weekend
            halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanDay>
                </>
              )
      );
      break;
    case 'after': //! ПОСЛЕ завтрака
      return (
        // weekday
        currentDate.day() !== 6 && currentDate.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .add(med.interval.minute, 'minute')
                .add(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanDay>
                </>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .add(med.interval.minute, 'minute')
                .add(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {/* <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/> */}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanDay>
                </>
              )
      );
      break;

    default:
      break;
  }
}
);

// export default DependingBreakfast;
export default DayDependingBreakfast; // memo, возможно быстрее будет загружатся лекарства в ячейке
