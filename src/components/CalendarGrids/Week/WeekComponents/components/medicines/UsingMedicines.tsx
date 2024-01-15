//! приём лекарств
import { Moment } from 'moment';
import { FC } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
// иконка
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: ITakingMedication | null;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med }) => {
  //* weekday
  // приёмы пищи:
  // 1-й приём пищи
  const firstMealWeekdays =
    mealSchedule[0].modeRegime.weekdays.firstMeal.clone(); // обз clone() иначе изменим исходник
  // последний приём пищи
  const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone();

  //* интервал (промежуточные приёмы пищи)
  // время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
  const diffIntervalMealWeekdays = lastMealWeekdays.diff(
    firstMealWeekdays,
    'seconds',
  ); // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
  //console.log(diffIntervalMealWeekdays) // 50400000
  // интервал времени / количество приёма ЛЕкарств
  // -1 потому что (в начале завтрак -1)
  const betweenMealsWeekdays = diffIntervalMealWeekdays / (med.quantity - 1); // 50400000(~14 ч) / 3-1раз/день = 3.5 часа -
  //console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)
  //! ровный шаг между едой
  // const stepWeekdays = firstMealWeekdays.clone().subtract(med.interval.minute(), 'minute').subtract(med.interval.hour(), 'hour')
  const addStepWeekdays = firstMealWeekdays
    .clone()
    .add(med.interval.minute(), 'minute')
    .add(med.interval.hour(), 'hour'); // обязательно clone()

  //* weekend
  // тоже самое только weekend
  const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone(); // обз clone() иначе изменим исходник
  const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone();

  const diffIntervalMealWeekend = lastMealWeekend.diff(
    firstMealWeekend,
    'seconds',
  );
  const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);
  //! ровный шаг между едой
  // const stepWeekend = firstMealWeekend.subtract(med.interval.minute(), 'minute').subtract(med.interval.hour(), 'hour')
  const addStepWeekend = firstMealWeekend
    .clone()
    .add(med.interval.minute(), 'minute')
    .add(med.interval.hour(), 'hour'); // обз clone()
  // ! создать отдельный файл (либо в беке либо во фронте) и передавать объектом

  if (med.depending) { //==================================== есть ли зависимости от завтрака/ужина/еды/
    //* если есть, то какая (еда, завтрак, ужин)?
    switch (med.action.type) {
      // ---------------------------------
      case 'eating': // =====================================от еды
        //* до, вовремя или после
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <>
                        <RiMedicineBottleLine style={{ color: 'red' }} />
                        <span style={{ color: 'gray', fontSize: '14px'}}>
                          {med.interval.format('H:mm')} до еды
                        </span>
                      </>
                    )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                    [...new Array(med.quantity - 1)].map(
                      (_, index) =>
                        halfHourItem.isSame(
                          firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                          'hour',
                        ) &&
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() <
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
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() <
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() <
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
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() <
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekdays.clone().minute() -
                          halfHourItem.minute() <
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
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() >=
                          0 && // 22:30 - 22:21 >= 0  and < 30
                        firstMealWeekend.clone().minute() -
                          halfHourItem.minute() <
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

        break;

      // ---------------------------------
      case 'first breakfast': //============================= от первого завтрака
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                          {med.interval.format('H:mm')} до завтрака
                        </span>
                      </>
                    )
                : // weekend
                  halfHourItem.isSame(
                    firstMealWeekend
                      .subtract(med.interval.minute(), 'minute')
                      .subtract(med.interval.hour(), 'hour'),
                    'hour',
                  ) &&
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
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
        break;

      // ---------------------------------
      case 'last supper': //================================= от последнего ужина
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
                  lastMealWeekdays.clone().minute() -
                    halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
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
                  lastMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  lastMealWeekend.clone().minute() - halfHourItem.minute() <
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
          );
          break;
        case 'while': //! ВОВРЕМЯ ужина
          return (
            // weekday
            dayItem.day() !== 6 && dayItem.day() !== 0
              ? halfHourItem.isSame(lastMealWeekdays, 'hour') &&
                  lastMealWeekdays.clone().minute() -
                    halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
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
                  lastMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  lastMealWeekend.clone().minute() - halfHourItem.minute() <
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
                  lastMealWeekdays.clone().minute() -
                    halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
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
                  lastMealWeekend.clone().minute() - halfHourItem.minute() >=
                    0 && // 22:30 - 22:21 >= 0  and < 30
                  lastMealWeekend.clone().minute() - halfHourItem.minute() <
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
          );
          break;

        default:
          break;
      }
        break;

      // ---------------------------------
      default:
        break;
    }
  } else { //======================================================= ВНЕ ЗАВИСИМОСТИ ОТ ЕДЫ
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
