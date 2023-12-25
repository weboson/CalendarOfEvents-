import { FC } from 'react';
// база данных
import dailyRegimes from '../../../../data/localDataBase/localDB_DailyRegime';
// Icons
import { GoSun } from 'react-icons/go'; // sun
import { BsMoon } from 'react-icons/bs'; // Moon
import { Moment } from 'moment';
// sc_styles
import { HourContent } from '../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';

// types
interface IProps {
  currentDate: Moment;
  dayItem: Moment;
}

const GridDayWithHours: FC<IProps> = ({ currentDate, dayItem }) => {
  // база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const regime = dailyRegimes[0].modeRegime; // режим дня

  // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
  const ArrayHalfHoursContent = [...new Array(48)].map((_, i) =>
    currentDate
      .startOf('day')
      .clone()
      .add(i * 30, 'm'),
  );

  //* Пример логики: чтобы искать нужный объект режима дня, по его id
  // let arr = dailyRegimes.find((item, index) => item.id == 2)
  // console.log(arr)

  return ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
    <HourContent
      key={hourIndex + 3}
      $currentHour={
        // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 марк только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
        moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
        dayItem.isSame(moment(), 'day') // current Day'
      }
      // for autoScrolling at the current hour
      id={halfHourItem.isSame(moment(), 'hour') ? 'autoScroll' : ''} // scroll вin Home.tsx
    >
      {
        // for regime (dailyRegimes)
        // marking "weekdays"
        dayItem.day() !== 6 && dayItem.day() !== 0 ? (
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
        ) : null
      }
    </HourContent>
  ));
};

export default GridDayWithHours;
