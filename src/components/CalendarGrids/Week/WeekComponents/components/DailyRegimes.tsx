//! Режим дня/сна: 2 вида режима: в будни и в выходные
import { Moment } from 'moment';
import { FC } from 'react';
// Icons
import { GoSun } from 'react-icons/go'; // sun
import { BsMoon } from 'react-icons/bs'; // Moon
// база данных
import dailyRegimes from '../../../../../data/localDataBase/localDB_DailyRegime';
import { stylesMoon, stylesSun } from '../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const DailyRegimes: FC<IProps> = ({ dayItem, halfHourItem }) => {
  // Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const regime = dailyRegimes[0].modeRegime; // режим дня

  return (
    <>
      {/* at weekday */}
      {dayItem.day() !== 6 && dayItem.day() !== 0 ? (
        halfHourItem >= regime.weekdays.startDay && //start 8:00 - endDay - 19:00 (weekdays)
        halfHourItem <= regime.weekdays.endDay ? (
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        ) // marking "weekend"
      ) : dayItem.day() == 6 || dayItem.day() == 0 ? (
        halfHourItem >= regime.weekend.startDay && // start 10:00 - endDay - 21:00 (weekend)
        halfHourItem <= regime.weekend.endDay ? (
            <GoSun style={stylesSun}/>
        ) : (
            <BsMoon style={stylesMoon}/>
        )
      ) : null}
    </>
  );
};

export default DailyRegimes;
