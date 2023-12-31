import { FC, useEffect } from 'react';
import {
  GridWrapper,
  DaySidePanel,
  WrapperSidePanel,
  HourSidePanel,
  WrapperTopPanelAndContent,
  DayOfWeek,
  WrapperColumn,
} from './stylesWeekGrid/sc_WeekGrid';
import moment, { Moment } from 'moment';
import GridDayWithHours from './WeekComponents/GridDayWithHours';


interface IProps {
  currentDate: Moment;
}

const WeekGrid: FC<IProps> = ({ currentDate }) => {
  // currentDate - это текущее врем, которое автоматически обновляется (useEffect) каждую минуту

  // Days of week (top panel)
  const ArrayDays = [...new Array(7)].map(
    (_, i) => currentDate.clone().startOf('week').add(i, 'day'), //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
  );

  // 24 Hours (side panel) HourSidePanel
  const ArrayHoursSidePanel = [...new Array(24)].map((_, i) =>
    currentDate.hours(i)
  );



//! Savind/Recovery Scroll position (сохраняет текущий скролл (в mode: Week), даже после перехода на другие компоненты - не нужно постоянно мотать до того места, где остановился)
 // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  useEffect(() => {
        //1 после события скроллинга пользователя - срабатывает сохраннение в sessionStorage(localStorage сохраняет даже после перезагрузки - нам это не нужно, на только после обновления)
        document.querySelector('#saveScroll')!.addEventListener('scroll', function() {
          const currentScroll =  document.querySelector('#saveScroll')!.scrollTop.toString() // получили текущий сролл (to String)
          sessionStorage.setItem('position', currentScroll) // сохранили в Storage
        });

        //2  получаем значение свойств scrollTop и используем его, чтобы скроллить на эту позицию
        // console.log(sessionStorage.getItem('position'))
        document.querySelector('#saveScroll')!.scrollTo(0, +sessionStorage.getItem('position')!) // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
        }
  , []);
 

  return (
    <GridWrapper id='saveScroll'>
      {/* Side Panel */}
      <WrapperSidePanel >
        {/* Title: "Day" */}
        <DaySidePanel>Day</DaySidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <HourSidePanel
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00 A')}
            {/* {HourSideItem.hour(index).format('LTS')} */}
          </HourSidePanel>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}
      <WrapperTopPanelAndContent>
        {ArrayDays.map((dayItem, index) => (
          <WrapperColumn key={index + 1}>
            <DayOfWeek
              key={index + 2}
              $currentDay={dayItem.isSame(moment(), 'day')}
            >
              {dayItem.format('dddd, D')}
            </DayOfWeek>

            {/* Grid Day with Hours (Content) */}
            <GridDayWithHours currentDate={currentDate} dayItem={dayItem} />

          </WrapperColumn>
        ))}
      </WrapperTopPanelAndContent>
    </GridWrapper>
  );
};

export default WeekGrid;
