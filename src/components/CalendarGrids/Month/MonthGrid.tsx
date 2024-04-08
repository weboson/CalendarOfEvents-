import { FC, useEffect, useState } from 'react';
import { Moment } from 'moment'; // Moment - это специальный тип для TS
import {
  GridWrapper,
  CellWrapper,
  RowInCell,
  DayWrapper,
  CurrentDay,
  MonthWrapper,
  DayContent,
  CounterWrapper,
} from './stylesMonthGrid/sc_MonthGrid';
import moment from 'moment';
import MedicinesMonth from './DayContent';
// data
import recipesMedications from '../../../data/localDataBase/LocalDB_WaysUsing';
import { arrayColors } from '../../../data/colors';
import MyPopup from '../../myPopup/MyPopup';
import СounterMedicines from './СounterMedicines';

interface IProps {
  firstDayOfWeek: Moment;
  currentDate: Moment;
}

const MonthGrid: FC<IProps> = ({ firstDayOfWeek, currentDate }) => {
  // console.log('MonthGrid');

  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки объекта
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // -1 день для смещения отчета на 1 день, иначе календарь врёт на 1 день
  // и прибавлям каждую итерацию +1 день и выводим его, но не меняем исходник, ведь мы клонируем clone()
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone());

  // проверка на текущий день, чтобы его маркировать
  const isCurrentDay = (day: object) => moment().isSame(day, 'day');
  // подцветка дней входящие в выбранный месяц
  const $isSelecctedMonth = (day: object) => currentDate.isSame(day, 'month');

  //! цветные иконки лекарств (также как и WeekGrid.tsx)):
  // массив цветов (arrayColors) генерируется в Colors.ts - в отдельном файле, т.к. генерируется 1 раз (для решения бага: если ЛС исчезнет, и если он снова появится, то уже без цвета )
  // назначение стилей
  useEffect(() => {
    recipesMedications.map((itemMed, index) => {
      // const color = getRandomColor();
      for (const elem of document.querySelectorAll(
        `.medElemUnic${itemMed.id}`, // пример классов: medElemUnic6, medElemUnic7, medElemUnic12 etc - (таким же методом назанченные в InDependently.tsx и тд.)
      )) {
        elem.style.cssText += `color: ${arrayColors[index] || 'white'};`;
      }
    });
  });

  // счетчик
  let count = 0;

  return (
    <MonthWrapper>
      {/* Weekday headers */}
      <GridWrapper $isHeader={1}>
        {[...Array(7)].map((_, indx) => (
          <CellWrapper $isHeader={1} key={indx} $isSelecctedMonth={true}>
            <RowInCell $justifyContent={'flex-end'} $pr={1}>
              {moment()
                .day(indx + 1)
                .format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>

      {/* Days Grid */}
      <GridWrapper>
        {daysArray.map((dayItem, index) => (
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

            {/* //! контент дня */}
            <DayContent>
              {recipesMedications.map((medItem, index) => {
                if (
                  moment(medItem.start, 'DD.MM.YYYY') <= dayItem &&
                  dayItem <
                    moment(medItem.start, 'DD.MM.YYYY')
                      .clone()
                      .add(medItem.duration.index, medItem.duration.title)
                ) {
                  if (dayItem) {
                    count++; // счетчик
                  }
                  return (
                    <MedicinesMonth
                      key={index}
                      currentDate={currentDate}
                      med={medItem}
                      dayItem={dayItem}
                    />
                  );
                }
                return null;
              })}
              <CounterWrapper key={index}>
                {/* счетчик */}
                {(count !== 0) && `x${count}`} 
                {/*Вызываемая функция СБРОСА счетчика. обязательно должен быть return */}
                {(() => {
                  count = 0;
                  return null;
                })()}
              </CounterWrapper>
            </DayContent>
          </CellWrapper>
        ))}
      </GridWrapper>
      <MyPopup />
    </MonthWrapper>
  );
};

export default MonthGrid;
