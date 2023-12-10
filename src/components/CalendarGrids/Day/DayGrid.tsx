import { Moment } from 'moment';
import { FC } from 'react';
import {
  BottomLeftSection,
  LeftSection,
  RightSection,
  TopLeftSection,
  WrapperBlock,
} from './stylesDayGrid/sc_DayGrid';
import DateBoard from './DayComponents/DateBoard';
import GridCalendar from './DayComponents/GridCalendar';

interface IProps {
  currentDate: Moment;
}

const DayGrid: FC<IProps> = ({currentDate}) => {


  return (
    <WrapperBlock>
        {/* Left */}
      <LeftSection>
        {/* Top left */}
        <TopLeftSection>
          <DateBoard currentDate={currentDate}/>
          <GridCalendar currentDate={currentDate}/>
        </TopLeftSection>
        <BottomLeftSection>
          30%
        </BottomLeftSection>
      </LeftSection>
      {/* Right */}
      <RightSection></RightSection>
    </WrapperBlock>
  );
};

export default DayGrid;
