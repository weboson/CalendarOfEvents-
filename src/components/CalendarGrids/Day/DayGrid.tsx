import { Moment } from 'moment';
import { FC } from 'react';
import {
    DateBoard,
  FullDate,
  GridCalendar,
  LeftSection,
  RightSection,
  TitleDay,
  TopLeftSection,
  WrapperBlock,
} from './stylesDayGrid/sc_DayGrid';

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
          <DateBoard>
            <TitleDay>
                {currentDate.format('D')}
            </TitleDay>
            <FullDate>
                {currentDate.format('dddd, D MMMM')}
            </FullDate>
          </DateBoard>
          <GridCalendar>Grid Calenar</GridCalendar>
        </TopLeftSection>
      </LeftSection>
      {/* Right */}
      <RightSection></RightSection>
    </WrapperBlock>
  );
};

export default DayGrid;
