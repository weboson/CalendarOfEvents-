import {FC} from 'react';
import { GridWrapper, DaySidePanel, WrapperSidePanel, HourSidePanel, WrapperTopPanel, DayOfWeek } from './stylesWeekGrid/sc_WeekGrid';
import moment, { Moment } from 'moment';

interface IProps {
    currentDate: Moment
  }

const WeekGrid:FC<IProps> = ({currentDate}) => {

 // Days of week
const ArrayDays = [... new Array(7)].map((_, i) => (
    currentDate.clone().startOf('week').add(i, 'day') //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
))

// console.log(ArrayDays[0].format('dddd')) // Monday
    return (
        <GridWrapper>
            {/* Side Panel */}
            <WrapperSidePanel>
                {/* Day */}
                <DaySidePanel>Day</DaySidePanel>
                {/* Hours */}
                {[... new Array(24)].map((_, i) => (
                    <HourSidePanel key={i}>{moment().hours(i).format('H:00 A')}</HourSidePanel>
                ))}
                
            </WrapperSidePanel>
            <WrapperTopPanel>
                {ArrayDays.map((dayItem, index) => (
                    <DayOfWeek key={index+1} $currentDay={(dayItem.isSame(moment(), 'day'))}>{dayItem.format('dddd')}</DayOfWeek>
                ))}
            </WrapperTopPanel>
            
        </GridWrapper>
    );
};

export default WeekGrid;