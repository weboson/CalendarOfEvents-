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
import ListDay from './DayComponents/listDay/ListDay';

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
        </BottomLeftSection>
      </LeftSection>
      {/* Right */}
      <RightSection>
        <ListDay />
      </RightSection>
    </WrapperBlock>
  );
};

export default DayGrid;
