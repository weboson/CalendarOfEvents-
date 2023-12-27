//! Режим питания:  Маркировка моментов приёма пищи в таблице времени и дней
//! Планирую добавить функциональность: 2 вида: в будни и выходные (также как и режимы дня)
import { FC } from 'react';
import dietRegimes from '../../../../../data/localDataBase/localDB_Diets';
import { MdOutlineFastfood } from 'react-icons/md';
import { Moment } from 'moment';

interface IProps {
  halfHourItem: Moment;
}

const DietRegimes: FC<IProps> = ({ halfHourItem }) => {
  return (
    <>
      {dietRegimes[0].meals!.map((item, indx) =>
        halfHourItem.isSame(item.time, 'hour') && // проверить на текущий час
        item.time.minute() - halfHourItem.minute() >= 0 && //exp: 15:30 - 15:00 >= 0 (true)
        item.time.minute() - halfHourItem.minute() < 30 ? ( // 15:30 - 15:30 < 30 (true)
          <MdOutlineFastfood key={indx} style={{ color: 'red' }} />
        ) : null,
      )}
    </>
  );
};

export default DietRegimes;
