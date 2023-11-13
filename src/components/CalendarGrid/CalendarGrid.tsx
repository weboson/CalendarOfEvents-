import { FC } from 'react';

const CalendarGrid: FC = () => {

    //const totalDays = 42;
    const daysArray = [... new Array(42)]

    return (
        <div>
            {
                daysArray.map((_, indx: number) => (
                    <div>
                        {indx}
                    </div>
                )) 
            }
        </div>
    );
};

export default CalendarGrid;