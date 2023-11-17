import { FC } from 'react';
import { Moment } from 'moment'; // Moment - это специальный тип для TS 
import { GridWrapper, CellWrapper, RowInCell, DayWrapper, CurrentDay } from '../../styles/sc_calendarGrid'
import moment from 'moment';


interface IProps {
    firstDayOfWeek: Moment
}

const CalendarGrid: FC<IProps> = ({firstDayOfWeek}) => {
  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки объекта
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // -1 день для смещения отчета на 1 день, иначе календарь врёт на 1 день
  // и прибавлям каждую итерацию +1 день и выводим его, но не меняем исходник, ведь мы клонируем clone()
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone()); 

  // проверка на текущий день, чтобы его маркировать
  const isCurrentDay = (day: object) => moment().isSame(day, 'day')

  return (
    <GridWrapper>
      {daysArray.map((dayItem) => (
        <CellWrapper key={dayItem.unix()} $isWeekend={dayItem.day() === 6 || dayItem.day() === 0}>
          <RowInCell $justifyContent={'flex-end'}>
            <DayWrapper>
              
                {!isCurrentDay(dayItem) ? dayItem.format('D') : <CurrentDay>{dayItem.format('D')}</CurrentDay>}
            </DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export default CalendarGrid;
