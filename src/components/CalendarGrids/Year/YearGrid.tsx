import moment, { Moment } from 'moment';
import { FC } from 'react';
import {
  CellDay,
  CellWeek,
  GridWrapperYear,
  MothTitle,
  WrapperMothCell,
  WrapperWeek,
  WrapperYear,
  СellMonths,
} from './stylesYearGrid/sc_YearGrid';
//  data
import recipesMedications from '../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  currentDate: Moment;
}

const YearGrid: FC<IProps> = ({ currentDate }) => {
  moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

  // начало первого месяца в году: 1-е январь
  const firstMonth = currentDate.clone().month(0).startOf('month');

  const ArrayMonths = [...new Array(12)].map((_, i) =>
    firstMonth.clone().add(i, 'month'),
  );

  // for marker cell with medicines
  let marker = false;
  const helper = (bool: boolean) => {
    marker = bool; // true/fasle
    return null;
  };

  return (
    <WrapperYear>
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
                // сохраню хоть что-то в переменную, чтобы не дублировать код
                const iDay = monthItem
                  .clone()
                  .startOf('month')
                  .startOf('week')
                  .add(i, 'day'); // переменная каждого дня
                  
                  {recipesMedications.map((medItem, index) =>
                    // расчет интервала (курс приёма лекарств)
                    moment(medItem.start, 'DD.MM.YYYY') <= iDay &&
                    iDay <
                      moment(medItem.start, 'DD.MM.YYYY')
                        .clone()
                        .add(medItem.duration.index, medItem.duration.title)
                      ? // если схоть одно лекарсвто находится в ячейке (в определенный день), то маркеруем true (далее ставим иконку)
                        helper(true)
                      : // или fasle
                        helper(false),
                  )}

                return (
                  <CellDay
                    key={i}
                    $isCurrentDay={
                      iDay.isSame(currentDate, 'day') &&
                      monthItem.isSame(currentDate, 'month')
                    }
                    $isCurrentDaysOfMonth={
                      iDay.isSame(currentDate, 'month') &&
                      monthItem.isSame(currentDate, 'month')
                    }
                    $isMedicines={marker}
                  >
                    {iDay.format('D')}
                  </CellDay>
                );
              })}
            </СellMonths>
          </WrapperMothCell>
        ))}
      </GridWrapperYear>
    </WrapperYear>
  );
};

export default YearGrid;
