import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import {
  BottomLeftSection,
  LeftSection,
  RightSection,
  TopLeftSection,
  WrapperBlock,
} from './stylesDayGrid/sc_DayGrid';
import DateBoard from './DayComponents/DateBoard';
import DayCalendar from './DayComponents/DayCalendar';
import DayGrid from './DayComponents/DayGrid/DayGrid';

interface IProps {
  currentDate: Moment;
}

const Day: FC<IProps> = ({currentDate}) => {

  return (
    <WrapperBlock>
        {/* Left */}

      {/* Right */}
      <RightSection>
        <DayGrid currentDate={currentDate}/>
      </RightSection>
    </WrapperBlock>
  );
};

export default Day;
