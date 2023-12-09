import { Moment } from 'moment';
import {FC} from 'react';
import { LeftSection, RightSection, WrapperBlock } from './stylesDayGrid/sc_DayGrid';

interface IProps {
    currentDate: Moment
  }

const DayGrid:FC<IProps> = () => {
    return (
                <WrapperBlock>
            <LeftSection >

            </LeftSection>
            <RightSection>

            </RightSection>
        </WrapperBlock>

    );
};

export default DayGrid;