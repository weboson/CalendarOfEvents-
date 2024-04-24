import { FC, useMemo } from 'react';
import {
  WrapperListHalfHours,
  WrapperList,
  WrapperGridDay,
  WrapperSidePanel,
} from '../../stylesDayGrid/sc_DayGrid';
import { Moment } from 'moment';
import moment from 'moment';
import ListDayHalfHours from './ListDayHalfHours';

interface IProps {
  currentDate: Moment;
}

const DayGrid: FC<IProps> = ({ currentDate }) => {
  // 24 Hours (side panel) HourSidePanel
  // Days of week (top panel)
  const ArrayHoursSidePanel = useMemo(
    () => [...new Array(24)].map((_, i) => currentDate.hours(i)),
    [currentDate],
  );

  return (
    <WrapperGridDay id="saveScrollDay">
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <WrapperListHalfHours
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00 A')}
          </WrapperListHalfHours>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}
      <WrapperList>
        {/* Grid Day with Hours (Content) */}
        <ListDayHalfHours currentDate={currentDate} />
      </WrapperList>
    </WrapperGridDay>
  );
};

export default DayGrid;
