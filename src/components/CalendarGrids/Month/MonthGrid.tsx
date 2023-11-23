import { FC } from 'react';
import { Moment } from 'moment'; // Moment - это специальный тип для TS
import {
  GridWrapper,
  CellWrapper,
  RowInCell,
  DayWrapper,
  CurrentDay,
} from '../stylesGrids/sc_calendarGrid';
import moment from 'moment';
import { useAppSelector } from '../../../store/hooks'; // redux-toolkit
import { menuModesDate } from '../../../data/dataMenu';

interface IProps {
  firstDayOfWeek: Moment;
  currentData: Moment
}

const CalendarGrid: FC<IProps> = ({ firstDayOfWeek, currentData }) => {
  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки объекта
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // -1 день для смещения отчета на 1 день, иначе календарь врёт на 1 день
  // и прибавлям каждую итерацию +1 день и выводим его, но не меняем исходник, ведь мы клонируем clone()
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone());

  // проверка на текущий день, чтобы его маркировать
  const isCurrentDay = (day: object) => moment().isSame(day, 'day');
  // подцветка дней входящие в выбранный месяц
  const $isSelecctedMonth = (day: object) => currentData.isSame(day, 'month');


// redux-toolkit (массив пунктов меню в dataMenu)
const index = useAppSelector((state) => state.menu)
console.log(menuModesDate[index].format)


  return (
    <>
      {/* Weekday headers */}
      <GridWrapper $isHeader={1}>
        {[...Array(7)].map((_, indx) => (
          <CellWrapper $isHeader={1} key={indx} $isSelecctedMonth={true}>
            <RowInCell $justifyContent={'flex-end'} $pr={1}>
              {moment().day(indx + 1).format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      
      {/* Days Grid */}
      <GridWrapper>
        {daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.unix()}
            $isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            $isSelecctedMonth={$isSelecctedMonth(dayItem)}
          >
            <RowInCell $justifyContent={'flex-end'}>
              <DayWrapper>
                {!isCurrentDay(dayItem) ? (
                  dayItem.format('D')
                ) : (
                  <CurrentDay>{dayItem.format('D')}</CurrentDay>
                )}
              </DayWrapper>
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
