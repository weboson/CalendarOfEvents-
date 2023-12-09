import moment, { Moment } from 'moment';
import { FC } from 'react';
import {
  CellDay,
  CellWeek,
  GridWrapperYear,
  MothTitle,
  WrapperMothCell,
  WrapperWeek,
  СellMonths,
} from './stylesYearGrid/sc_YearGrid';

interface IProps {
  currentDate: Moment
}

const YearGrid: FC<IProps> = ({currentDate}) => {
  moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

  // начало первого месяца в году: 1-е январь
  const firstMonth = currentDate.clone().month(0).startOf('month');

  const ArrayMonths = [...new Array(12)].map((_, i) =>
    firstMonth.clone().add(i, 'month'),
  );

  return (
    <>
      <GridWrapperYear>
        {ArrayMonths.map((monthItem, index) => (
          <WrapperMothCell
            key={index + 1}
            $isCurrentMonth={monthItem.isSame(moment(), 'month') ? true : false}
          >
            <MothTitle>{monthItem.format('MMMM')}</MothTitle>

            {/* Week */}
            <WrapperWeek>
              {[...Array(7)].map((_, indx) => (
                <CellWeek key={indx + 2}>
                  {moment()
                    .day(indx + 1)
                    .format('ddd')}
                </CellWeek>
              ))}
            </WrapperWeek>

            <СellMonths key={index + 3}>
              {[...new Array(42)].map((_, i) => { 
                // сохраню хоть что-то в перменную, чтобы не дублировать код
                let iDay = monthItem
                .clone()
                .startOf('month')
                .startOf('week').add(i, 'day'); // переменная каждого дня
                
                return (
                <CellDay
                     key={i}
                  $isCurrentDay={
                    iDay
                    .isSame(moment(), 'day') && monthItem.isSame(moment(), 'month')}

                  $isCurrentDays={
                    iDay
                    .isSame(moment(), 'month') && monthItem.isSame(moment(), 'month')
                  }
                >
                  {iDay
                    .format('D')}
                </CellDay>
              )})}
            </СellMonths>
          </WrapperMothCell>
        ))}
      </GridWrapperYear>
    </>
  );
};

export default YearGrid;
