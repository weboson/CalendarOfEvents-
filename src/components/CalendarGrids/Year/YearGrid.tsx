import moment, { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import currentDate from '../../../data/currentDate';
import {
  CellDay,
  CellWeek,
  CurrentDay,
  GridWrapperYear,
  MothTitle,
  WrapperMothCell,
  WrapperWeek,
  СellMonths,
} from './stylesYearGrid/sc_YearGrid';


const YearGrid: FC = () => {
  moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

  // начало первого месяца в году: 1-е январь
  const firstMonth = moment().clone().month(0).startOf('month');
  // console.log(firstMonth.format('DD-MMMM-YY'));

  // понедельник-26-декабря: начало календарной недели входящая в январь - сделал в самом чередовании
  const firstCalendarDay = moment()
    .clone()
    .month(0)
    .startOf('month')
    .startOf('week');

  const ArrayMonths = [...new Array(12)].map((_, i) =>
    firstMonth.clone().add(i, 'month'),
  );

  // console.log(ArrayMonths[0]);

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
              {[...new Array(42)].map((_, i) => (
                <CellDay
                     key={i}
                  $isCurrentDay={monthItem
                    .clone()
                    .startOf('month')
                    .startOf('week')
                    .add(i, 'day')
                    .isSame(moment(), 'day') && monthItem.isSame(moment(), 'month')}

                  $isCurrentDays={monthItem
                    .clone()
                    .startOf('month')
                    .startOf('week')
                    .add(i, 'day')
                    .isSame(moment(), 'month')
                  }
                >
                  {monthItem
                    .clone()
                    .startOf('month')
                    .startOf('week')
                    .add(i, 'day')
                    .format('D')}
                </CellDay>
              ))}
            </СellMonths>
          </WrapperMothCell>
        ))}
      </GridWrapperYear>
    </>
  );
};

export default YearGrid;
