//! Режим питания:  Маркировка моментов приёма пищи в таблице времени и дней
//! Планирую добавить функциональность: 2 вида: в будни и выходные (также как и режимы дня)
import { FC } from 'react';
import dietRegimes from '../../../../../data/localDataBase/localDB_Diets';
import { MdOutlineFastfood } from 'react-icons/md';
import { Moment } from 'moment';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const DietRegimes: FC<IProps> = ({ halfHourItem, dayItem }) => {
  // выберем режим дня 'Моя диета №1'
  const diet = dietRegimes[0].meals;

  return (
    <>
      { //weekday
      dayItem.day() !== 6 && dayItem.day() !== 0
        ? diet.weekday.map(
            (item, indx) =>
              halfHourItem.isSame(item.time, 'hour') && // проверить на текущий час
              item.time.minute() - halfHourItem.minute() >= 0 && //exp: 15:30 - 15:00 >= 0 (true)
              item.time.minute() - halfHourItem.minute() < 30 && ( // 15:30 - 15:30 < 30 (true)
                <MdOutlineFastfood key={indx} style={{ color: 'red' }} />
              ),
          )
        // weekend
        : dayItem.day() == 6 || dayItem.day() == 0
        ? diet.weekend.map(
            (item, indx) =>
              halfHourItem.isSame(item.time, 'hour') && // проверить на текущий час
              item.time.minute() - halfHourItem.minute() >= 0 && //exp: 15:30 - 15:00 >= 0 (true)
              item.time.minute() - halfHourItem.minute() < 30 && ( // 15:30 - 15:30 < 30 (true)
                <MdOutlineFastfood key={indx} style={{ color: 'red' }} />
              ),
          )
        : null}
    </>
  );
};

export default DietRegimes;
