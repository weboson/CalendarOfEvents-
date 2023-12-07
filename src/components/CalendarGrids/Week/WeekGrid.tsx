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
// currentDate - это текущее врем, которое автоматически обновляется (useEffect) каждую минуту

  // Days of week (top panel)
  const ArrayDays = [...new Array(7)].map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'day'), //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
  );

  // 24 Hours (side panel) HourSidePanel
  const ArrayHoursSidePanel = [...new Array(24)].map((_, i) => 
    currentDate.hours(i)
  );

  // 24 Hours (content)
  const ArrayHoursContent = [...new Array(24)].map((_, i) => 
    currentDate.clone().startOf('day').add(i, 'hour'),
  );

  return (
    <GridWrapper>
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Title: "Day" */}
        <DaySidePanel>Day</DaySidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <HourSidePanel key={index} $currentSideHour={HourSideItem.hours(index).isSame(moment(), 'hour')}>
            {HourSideItem.hour(index).format('H:00 A')}
            {/* {HourSideItem.hour(index).format('LTS')} */}
          </HourSidePanel>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}
      <WrapperTopPanelAndContent>
        {ArrayDays.map((dayItem, index) => (
          <WrapperColumn key={index + 1}>
            <DayOfWeek
              key={index + 2}
              $currentDay={dayItem.isSame(moment(), 'day')}
            >
              {dayItem.format('dddd, D')}
            </DayOfWeek>
            {/* Hours (Top Panel) */}
            {ArrayHoursContent.map((hourItem, hourIndex) => (
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
