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


    // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
    const ArrayHalfHoursContent = [...new Array(48)].map((_, i) =>
    currentDate.startOf('day').clone().add(i*30, 'm')
  );

  //! Пример логики: чтобы искать нужный объект режима дня, по его id
  // let arr = dailyRegimes.find((item, index) => item.id == 2)
  // console.log(arr)

  return (
    ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
        <HourContent
          key={hourIndex + 3}
          $currentHour={
            //! проверка: чтобы == текущему часу и меньше чем текущие минуты
            //! пример: 4:30 <= 4:19 = маркирован первая ячейка до 4:30 
            halfHourItem.isSame(moment(), 'hour') && halfHourItem.minute() <= moment().minute()  
            &&
            dayItem.isSame(moment(), 'day')
          }
        >
          <div style={{color: 'white'}}>{halfHourItem.format('HH mm')}</div>
          { // marking weekdays for regime (dailyRegimes)
          (dayItem.day() !== 6 && dayItem.day() !== 0 ) ? (
            (halfHourItem >= regime.weekdays.startDay &&
            halfHourItem <= regime.weekdays.endDay) ? (
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
            ) // marking weekend
          ) : (dayItem.day() == 6 || dayItem.day() == 0 ) ? (
            (halfHourItem >= regime.weekend.startDay &&
            halfHourItem <= regime.weekend.endDay) ? (
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
