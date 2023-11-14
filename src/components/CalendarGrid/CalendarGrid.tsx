import { FC } from 'react';
import styled from 'styled-components';
import { Moment } from 'moment'; // Moment - это специальный тип для TS 

// ts тип для css свойства
export interface IRowInCellProps {
  justifycontent: string;
}



const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    7,
    1fr
  ); // одно и тоже, как: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: repeat(6, 1fr);
  /* подложка (фон), чтобы сделать рамки ячеек */
  grid-gap: 1px;
  background-color: #484848;
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: 80px;
  background-color: #1e1f21;
  color: #dddcdd;
`;

const RowInCell = styled.div<IRowInCellProps>`
  display: flex;
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : 'flex-start'};
`;

const DayWrapper = styled.div`
  display: flex;
  height: 33px;
  width: 33px;
  align-items: center;
  justify-content: center;
`;

interface IProps {
    firstDayOfWeek: Moment
    lastDayOfWeek: Moment
}

const CalendarGrid: FC<IProps> = ({firstDayOfWeek, lastDayOfWeek}) => {
  const totalDays = 42;
  const g = lastDayOfWeek;
  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // уменьшили на 1 день 
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone()); // прибавили на 1 день


  return (
    <GridWrapper>
      {daysArray.map((dayItem, indx: number) => (
        <CellWrapper key={dayItem.format('DDMMYYYY')}>
          <RowInCell justifycontent={'flex-end'}>
            <DayWrapper>{dayItem.format('D')}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export default CalendarGrid;
