import { FC } from 'react';
// база данных
import dailyRegime, { IDailyRegime } from '../../../../data/localDataBase/localDB_DailyRegime';
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
  const regime = dailyRegime; // режим дня

  // Array 24 Hours (content)
  const ArrayHoursContent = [...new Array(24)].map((_, i) =>
  currentDate.clone().startOf('day').add(i, 'hour'),
  );

// если modeDR: 'weekdays' то пометить все будни, или 'weekends ' то пометить все выходные 
  const isWeekend = (dailyRegime: IDailyRegime, dayItem: Moment) => {
    switch (dailyRegime[0].modeDR) {
        case 'weekdays': 
            return (dayItem.day() !== 6 && dayItem.day() !== 0 )
            
        case 'weekends': 
            return (dayItem.day() == 6 || dayItem.day() == 0 )        
    
        default:
            break;
    }
  }

  return (
    ArrayHoursContent.map((hourItem, hourIndex) => (
        <HourContent
          key={hourIndex + 3}
          $currentHour={
            hourItem.isSame(moment(), 'hour') &&
            dayItem.isSame(moment(), 'day')
          }
        >
          {isWeekend(dailyRegime, dayItem) ? (
            hourItem >= regime[0].startDay &&
            hourItem <= regime[0].endDay ? (
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
