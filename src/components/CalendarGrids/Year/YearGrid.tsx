import { FC, useState } from 'react';
import {
  СellMonths,
  GridWrapperYear,
  CellDay,
  WrapperMothCell,
  MothTitle,
} from './stylesYearGrid/sc_YearGrid';
import moment from 'moment';

interface IYearGridProps {
}

const YearGrid: FC<IYearGridProps> = () => {

 moment.updateLocale('ru', { week: { dow: 1 } }); // настройка: еделя начинается с понедельника
 
  
  const daysArray = [...new Array(42)];
 
  window.moment = moment;

  // массив месяцев (с января с 1 числа) и каждый месяц начинается с первой недели
  const monthArray = [...new Array(12)].map((_, i) => (moment().clone().month(i).startOf('month').startOf('week'))) // .startOf('month').startOf('week') - начать отчет ячеек с 1 месяца и 1-й недели
  
  return (
    <>
    <GridWrapperYear>
{/* 12 циклов (месяцев)  */}
      {monthArray.map((itemMonth, index) => (

         <WrapperMothCell key={index+2}>

        <MothTitle key={index}>
          {itemMonth.clone().add(1,'month').format('MMMM')}
        </MothTitle>

        <СellMonths>
{/* 42 цикла по 12 раз */}
        {daysArray.map((_, indx) => (

          <CellDay>{itemMonth.clone().add(indx, 'day').format('D')}</CellDay>
          
          ))}

       
        </СellMonths>
        </WrapperMothCell>
      ))}

    </GridWrapperYear>
    </>
  );
};

export default YearGrid;
