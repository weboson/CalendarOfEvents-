import { FC } from 'react';
import { Moment } from 'moment';
// sc_styles
import { HourContent } from '../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';
import DailyRegimes from './components/DailyRegimes';
//!
import dietRegimes from '../../../../data/localDataBase/localDB_Diets';
import { MdOutlineFastfood } from 'react-icons/md';

// types
interface IProps {
  currentDate: Moment;
  dayItem: Moment;
}

const GridDayWithHours: FC<IProps> = ({ currentDate, dayItem }) => {
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
      // id for autoScrolling at the current hour
      id={halfHourItem.isSame(moment(), 'hour') ? 'autoScroll' : ''} // scroll вin Home.tsx
    >
      {/* //* for regime (dailyRegimes)(режим дня)
         marking "weekdays" */}
      <DailyRegimes dayItem={dayItem} halfHourItem={halfHourItem} />

      {/* //* for Dies (dietRegimes)(режим приёма пищи) */}
      {dietRegimes[0].meals.map((item, indx, arr) =>
        (halfHourItem.isSame(item.time, 'hour')) ? <MdOutlineFastfood key={indx} style={{ color: 'blue' }} /> : null
      )}
    </HourContent>
  ));
};

export default GridDayWithHours;
