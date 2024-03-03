//! Приём Лекарств зависит от приёма пищи (до/вовремя/после)
// case: Depending of Eating    ---  takingMedications[0].action: waysUsing[0].type
import { Moment } from 'moment';
import { FC } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import moment from 'moment';
import { DivWrapper } from '../../../../../../Header/stylesHeader/sc_calendarHeader';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  betweenMealsWeekdays: number;
  firstMealWeekend: Moment;
  betweenMealsWeekend: number;
  med: ITakingMedication;
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
  // нужен .clone() - иначе add и subtract будут дублировать свои выполнение, и вместо add(6 часов) получим add(12)
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();


  //! for Warning marker (Предупреждающий маркер, когда текущее время совпадает с приёмом лекарства)


  //! helper 
  const helperWarningMarker = (firstMeal: Moment, halfHourItem: Moment) => {
    return moment().isSame(firstMeal, 'hour') &&
      dayItem.isSame(moment(), 'day') &&
      moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
      moment().minute() - halfHourItem.minute() >= 0
      ? (<div style={{color: "white"}}>Warning: use Medicine</div>)
      : (<div style={{color: "white"}}>no</div>);
  };

  switch (med.position) {
    case 'before': //! до
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
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  {/* //! Warning Marker */}
                  {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>{med.interval.format('H:mm')} до еды</span>
                  <br />
                </>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                    'hour',
                  ) &&
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`before-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span>{med.interval.format('H:mm')} до еды</span>
                      <br />
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
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  {helperWarningMarker(firstMealWeekend, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>{med.interval.format('H:mm')} до еды</span>
                </div>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekend.add(betweenMealsWeekend, 's'),
                    'hour',
                  ) &&
                  firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekend.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekend, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`before-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span>{med.interval.format('H:mm')} до еды</span>
                      <br />
                    </div>
                  ),
              )
      );

      break;
    case 'while': //! вовремя
      return (
        // weekday
        // первый приём ЛС
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>Вовремя еды</span> <br />
                </div>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                    'hour',
                  ) &&
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`while-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span>Вовремя еды</span> <br />
                    </div>
                  ),
              )
          : // weekend
            (halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  {helperWarningMarker(firstMealWeekend, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>Вовремя еды</span> <br />
                </div>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekend.add(betweenMealsWeekend, 's'),
                    'hour',
                  ) &&
                  firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekend.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekend, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`while-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span key={index + 4}>Вовремя еды</span> <br />
                    </div>
                  ),
              )
      );
      break;
    case 'after': //! после
      return (
        // weekday
        // первый приём ЛС
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? (halfHourItem.isSame(
              firstMealWeekdays
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>{med.interval.format('H:mm')} после еды</span>
                  <br />
                </div>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                    'hour',
                  ) &&
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekdays, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`after-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span>{med.interval.format('H:mm')} после еды</span>
                      <br />
                    </div>
                  ),
              )
          : // weekend
            (halfHourItem.isSame(
              firstMealWeekend
                .add(med.interval.minute(), 'minute')
                .add(med.interval.hour(), 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  {helperWarningMarker(firstMealWeekend, halfHourItem)}
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span>{med.interval.format('H:mm')} после еды</span>
                  <br />
                </div>
              )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(med.quantity - 1)].map(
                (_, index) =>
                  halfHourItem.isSame(
                    firstMealWeekend.add(betweenMealsWeekend, 's'),
                    'hour',
                  ) &&
                  firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekend.clone().minute() - halfHourItem.minute() <
                    30 && (
                    <div key={index}>
                      {helperWarningMarker(firstMealWeekend, halfHourItem)}
                      <RiMedicineBottleLine
                        key={`after-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span key={index + 4}>
                        {med.interval.format('H:mm')} после еды
                      </span>
                    </div>
                  ),
              )
      );
      break;
    default:
      break;
  }
};

export default DependingEating;
