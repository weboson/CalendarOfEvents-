//! Mode Year (общий календарь)
import { FC } from 'react';
import {
  СellMonths,
  GridWrapperYear,
  CellDay,
  WrapperMothCell,
  MothTitle,
  CellWeek,
  WrapperWeek,
} from './stylesYearGrid/sc_YearGrid';
import moment from 'moment';
import currentDate from '../../../data/currentDate';

const YearGrid: FC = () => {
  moment.updateLocale('ru', { week: { dow: 1 } }); // настройка: еделя начинается с понедельника

  // массив месяцев (с января с 1 числа, чтобы отчет дней не был с текущего числа) и каждый месяц начинается с первой недели
  const monthArray = [...new Array(12)].map((_, i) =>
    moment().clone().month(i).startOf('month').startOf('week'),
  ); // .startOf('month').startOf('week') - начать отчет ячеек с 1 месяца и 1-й недели

  console.log(monthArray[11].isSame(currentDate, 'month'));

  // текущий месяц (для проверки, чтобы маркировать $isCurrentMonth)
  const curruenMonth = moment().subtract(1, 'month'); // -1 иначе спешит на 1 месяц

  return (
    <>
      <GridWrapperYear>
        {/* 12 итераций  */}
        {monthArray.map((itemMonth, index) => (
          <WrapperMothCell
            key={index + 2}
            $isCurrentMonth={
              itemMonth.isSame(curruenMonth, 'month') ? true : false
            }
          >
            {/* Months:  */}
            <MothTitle key={index}>
              {itemMonth.clone().add(1, 'month').format('MMMM')}
            </MothTitle>

            {/* Week */}
            <WrapperWeek>
              {[...Array(7)].map((_, indx) => (
                <CellWeek key={indx + 3}>
                  {moment()
                    .day(indx + 1)
                    .format('ddd')}
                </CellWeek>
              ))}
            </WrapperWeek>

            <СellMonths>
              {/* Days: 42 цикла по 12 раз */}
              {[...new Array(42)].map((_, indx) => (
                <CellDay
                  key={indx + 1}
                  $isWeekend={
                    itemMonth.day(indx).format('d') == '6' ||
                    itemMonth.day(indx).format('d') == '5'
                  }
                >
                  {itemMonth.clone().add(indx, 'day').format('D')}
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
