//! Приём Лекарств зависит от приёма пищи (до/вовремя/после)
// case: Depending of Eating    ---  takingMedications[0].action: waysUsing[0]
import { Moment } from 'moment';
import { FC, useState } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
// обработчик поведения myPopup при наведения на элемент
import { hoverMouseOnMedicine } from '../../../../../../../service/handler_forPopup';
import { useAppDispatch, useAppSelector } from '../../../../../../../store/hooks';
import { readingPopupData } from '../../../../../../../store/features/popupDataSlice';

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



  //Redux-toolkit - из hooks.tsx - 
  // получили данные
  const dataPopup = useAppSelector((state) => state.menu);

  //Redux-toolkit - из hooks.tsx - изменить данные
  const dispatch = useAppDispatch()
  // const [popup, setPopup] = useState(dataPopup);

  //! Обработчик для события onMouseOver и onMouseOut
  // (еще в самом myPopup.tsx есть событие - чтобы popup не исчезал при наведение на самого popup)
  const hoverMouseOnMedicine = (event) => {
    // console.log(event.target)
    // console.log(`${e.clientX} ${e.clientY}`)
    // console.log(e.type)
    const top = event.clientY;
    const left = event.clientX;
    const cell = document.querySelector('#popup');
    // const cell2 = event.target;
    // setDataPopup({dataPopup})
    // если мышь наведена на элемент
    // setDataPopup(med.id);
    if (event.type == 'mouseover') {
      // меняем данные
      dispatch(readingPopupData(med.id))
      cell!.style.cssText = `
        top: ${top - 200}px;
        left: ${left}px;
        display: block;`;
    } else {
      // если мышь ушла с элемента (mouseout)
      cell!.style.cssText = `
      display: none;`;
      dispatch(readingPopupData(''))
    }
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
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span
                    //! события наведения и уходы мыши
                    onMouseOver={hoverMouseOnMedicine}
                    onMouseOut={hoverMouseOnMedicine}
                    style={{
                      color: 'gray',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {med.interval.format('H:mm')} до еды
                  </span><br />
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
                      <RiMedicineBottleLine
                        key={`before-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span style={{ color: 'gray', fontSize: '14px' }}>
                        {med.interval.format('H:mm')} до еды
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
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    {med.interval.format('H:mm')} до еды
                  </span>
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
                      <RiMedicineBottleLine
                        key={`before-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span style={{ color: 'gray', fontSize: '14px' }}>
                        {med.interval.format('H:mm')} до еды
                      </span>
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
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    Вовремя еды
                  </span>{' '}
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
                      <RiMedicineBottleLine
                        key={`while-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span style={{ color: 'gray', fontSize: '14px' }}>
                        Вовремя еды
                      </span>{' '}
                    </div>
                  ),
              )
          : // weekend
            (halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <div>
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    Вовремя еды
                  </span>{' '}
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
                      <RiMedicineBottleLine
                        key={`while-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span
                        key={index + 4}
                        style={{ color: 'gray', fontSize: '14px' }}
                      >
                        Вовремя еды
                      </span>{' '}
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
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    {med.interval.format('H:mm')} после еды
                  </span>
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
                      <RiMedicineBottleLine
                        key={`after-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span style={{ color: 'gray', fontSize: '14px' }}>
                        {med.interval.format('H:mm')} после еды
                      </span>
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
                  <RiMedicineBottleLine style={{ color: 'red' }} />
                  <span style={{ color: 'gray', fontSize: '14px' }}>
                    {med.interval.format('H:mm')} после еды
                  </span>
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
                      <RiMedicineBottleLine
                        key={`after-${index}`}
                        style={{ color: 'red' }}
                      />
                      <span
                        key={index + 4}
                        style={{ color: 'gray', fontSize: '14px' }}
                      >
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
