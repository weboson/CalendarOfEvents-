import { Moment } from 'moment';
import { FC, memo } from 'react';

interface IDayContent {
    currentDate: Moment
}

const DayContent:FC<IDayContent> = memo(({currentDate}) => {
    return (
        <div>
            hello
        </div>
    )
  })


export default DayContent;