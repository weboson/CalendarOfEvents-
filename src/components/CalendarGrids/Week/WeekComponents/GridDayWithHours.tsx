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
    currentDate: Moment
    dayItem: Moment
  }


const GridDayWithHours: FC<IProps> = ({currentDate, dayItem}) => {
  // база данных: src\data\localDataBase\localDB_DailyRegime.ts
  const regime = dailyRegimes[0].modeRegime; // режим дня

  // Array 24 Hours (content)
  const ArrayHoursContent = [...new Array(24)].map((_, i) =>
  currentDate.clone().startOf('day').add(i, 'hour'),
  );

  //! Пример логики: чтобы искать нужный объект режима дня, по его id
  // let arr = dailyRegimes.find((item, index) => item.id == 2)
  // console.log(arr)

  return (
    ArrayHoursContent.map((hourItem, hourIndex) => (
        <HourContent
          key={hourIndex + 3}
          $currentHour={
            hourItem.isSame(moment(), 'hour') &&
            dayItem.isSame(moment(), 'day')
          }
        >
          { // marking weekdays
          (dayItem.day() !== 6 && dayItem.day() !== 0 ) ? (
            (hourItem >= regime.weekdays.startDay &&
            hourItem <= regime.weekdays.endDay) ? (
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
            ) // marking weekend
          ) : (dayItem.day() == 6 || dayItem.day() == 0 ) ? (
            (hourItem >= regime.weekend.startDay &&
            hourItem <= regime.weekend.endDay) ? (
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
          ) : null }
          
        </HourContent>
      ))
  );
};

export default GridDayWithHours;
