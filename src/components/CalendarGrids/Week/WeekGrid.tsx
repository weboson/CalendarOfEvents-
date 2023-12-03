import {FC} from 'react';
import { GridWrapper, DaySidePanel, WrapperSidePanel, HourSidePanel, WrapperHeaderDays } from './stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';

const WeekGrid:FC = () => {
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
            <WrapperHeaderDays>20220</WrapperHeaderDays>
        </GridWrapper>
    );
};

export default WeekGrid;