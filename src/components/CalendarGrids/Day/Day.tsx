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


  // auto scroll "week" for id=#autoScrollDay: grid hours
  // в ListDayHalfHours.tsx есть элемент с
  useEffect(() => {
    setTimeout(
      () =>
        // автосролл
        document
          .querySelector('#autoScrollDay')! //Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
          .scrollIntoView({
            // https://learn.javascript.ru/size-and-scroll-window#scrollintoview
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          }),

      1200,
    );
  }, []);

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
