import { FC } from 'react';
import { Moment } from 'moment'; // Moment - это специальный тип для TS 
import { GridWrapper, CellWrapper, RowInCell, DayWrapper } from '../../styles/sc_calendarGrid'


interface IProps {
    firstDayOfWeek: Moment
}

const CalendarGrid: FC<IProps> = ({firstDayOfWeek}) => {
  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки объекта
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // -1 день для смещения отчета на 1 день, иначе календарь врёт на 1 день
  // и прибавлям каждую итерацию +1 день и выводим его, но не меняем исходник, ведь мы клонируем clone()
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone()); 


  return (
    <GridWrapper>
      {daysArray.map((dayItem) => (
        <CellWrapper key={dayItem.format('DDMMYYYY')} isWeekend={dayItem.day() === 6 || dayItem.day() === 0}>
          <RowInCell justifycontent={'flex-end'}>
            <DayWrapper>{dayItem.format('D')}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export default CalendarGrid;
