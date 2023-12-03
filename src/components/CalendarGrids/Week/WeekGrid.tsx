import { FC } from 'react';
import {
  GridWrapper,
  DaySidePanel,
  WrapperSidePanel,
  HourSidePanel,
  WrapperTopPanelAndContent,
  DayOfWeek,
  HourContent,
  WrapperColumn,
} from './stylesWeekGrid/sc_WeekGrid';
import moment, { Moment } from 'moment';

interface IProps {
  currentDate: Moment;
}

const WeekGrid: FC<IProps> = ({ currentDate }) => {
  // Days of week
  const ArrayDays = [...new Array(7)].map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'day'), //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
  );

  // 24 Hours
  const ArrayTwentyFourHours = [...new Array(24)].map((_, i) =>
    currentDate.clone().startOf('day').add(i, 'hour'),
  );

  // console.log(ArrayDays[0].format('dddd')) // Monday
  // console.log(ArrayTwentyFourHours[0].format('HH')); // Monday
  return (
    <GridWrapper>
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Day */}
        <DaySidePanel>Day</DaySidePanel>
        {/* Hours */}
        {[...new Array(24)].map((_, i) => (
          <HourSidePanel key={i}>
            {moment().hours(i).format('H:00 A')}
          </HourSidePanel>
        ))}
      </WrapperSidePanel>
      <WrapperTopPanelAndContent>
        {ArrayDays.map((dayItem, index) => (
          <WrapperColumn key={index + 1}>
            <DayOfWeek
              key={index + 2}
              $currentDay={dayItem.isSame(moment(), 'day')}
            >
              {dayItem.format('dddd, D')}
            </DayOfWeek>
            {ArrayTwentyFourHours.map((hourItem, hourIndex) => (
              <HourContent
                key={hourIndex + 3}
                $currentHour={
                  hourItem.isSame(moment(), 'hour') &&
                  dayItem.isSame(moment(), 'day')
                }
              ></HourContent>
            ))}
          </WrapperColumn>
        ))}
      </WrapperTopPanelAndContent>
    </GridWrapper>
  );
};

export default WeekGrid;
