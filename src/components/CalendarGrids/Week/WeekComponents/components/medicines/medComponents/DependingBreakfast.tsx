//! Приём Лекарств зависит ПЕРВОГО приёма пищи (до/вовремя/после)
// case: 'first breakfast'    ---  takingMedications[0].action: waysUsing[1]
import { Moment } from 'moment';
import { FC } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import moment from 'moment';
import { readingWarningMarker } from '../../../../../../../store/features/warningMarkerSlice';
import { useAppDispatch } from '../../../../../../../store/hooks';

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

    //! redux-toolkit
    const dispatch = useAppDispatch(); // передается и используется в helperWarningMarker.tsx
    // warningMarker = useAppSelector((state) => state.warningMarker) используется в GridDayWithHours.tsx
    //! helper: возращает потребителям true/false - и там же вызываю useAppDispatch
  const helperWarningMarker = (
    firstMeal: Moment,
    halfHourItem: Moment,
    dayItem: Moment,
  ) => {
    moment().isSame(firstMeal, 'hour') &&
    dayItem.isSame(moment(), 'day') &&
    moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
    moment().minute() - halfHourItem.minute() >= 0
      ? dispatch(readingWarningMarker(true))
      : null;
  };


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
                  {helperWarningMarker(firstMealWeekdays, halfHourItem, dayItem)}
                  <RiMedicineBottleLine 
                    style={{
                      color: 'red',
                      top: '18px',
                    }}
                  />
                  <span>
                    {/*//! вариант с названием ЛС {`${med.interval.format('H:mm')} ${med?.title}`} */}
                    {med.interval.format('H:mm')} до завтрака 
                  </span><br/>
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
                    }}
                  />
                  <span>
                    {med.interval.format('H:mm')} до завтрака
                  </span><br/>
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
                      color: 'red',}}
                  />
                  <span>
                    Вовремя завтрака
                  </span><br/>
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
                      color: 'red',}}
                  />
                  <span>
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
                      color: 'red'}}/>
                  <span>
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
                      color: 'red',}}
                  />
                  <span>
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
