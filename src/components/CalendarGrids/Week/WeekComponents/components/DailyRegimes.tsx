//! Режим дня/сна: 2 вида режима: в будни и в выходные
import { Moment } from 'moment';
import { FC } from 'react';
// Icons
import { GoSun } from 'react-icons/go'; // sun
import { BsMoon } from 'react-icons/bs'; // Moon
// база данных
import dailyRegimes from '../../../../../data/localDataBase/localDB_DailyRegime';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const DailyRegimes: FC<IProps> = ({ dayItem, halfHourItem }) => {
  // Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const regime = dailyRegimes[0].modeRegime; // режим дня

  return (
    <>
      {dayItem.day() !== 6 && dayItem.day() !== 0 ? (
        halfHourItem >= regime.weekdays.startDay && //start 8:00 - endDay - 19:00 (weekdays)
        halfHourItem <= regime.weekdays.endDay ? (
          <GoSun
            style={{
              color: '#f4fbab',
              float: 'right',
              margin: '1px 1px 0 0',
            }}
          />
        ) : (
          <BsMoon
            style={{
              color: '#565759',
              float: 'right',
              margin: '1px 1px 0 0',
            }}
          />
        ) // marking "weekend"
      ) : dayItem.day() == 6 || dayItem.day() == 0 ? (
        halfHourItem >= regime.weekend.startDay && // start 10:00 - endDay - 21:00 (weekend)
        halfHourItem <= regime.weekend.endDay ? (
          <GoSun
            style={{
              color: '#f4fbab',
              float: 'right',
              margin: '5px 5px 0 0',
            }}
          />
        ) : (
          <BsMoon
            style={{
              color: '#565759',
              float: 'right',
              margin: '5px 5px 0 0',
            }}
          />
        )
      ) : null}
    </>
  );
};

export default DailyRegimes;
