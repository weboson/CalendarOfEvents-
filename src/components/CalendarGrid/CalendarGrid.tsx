import { FC } from 'react';
import styled from 'styled-components';

// ts тип
    export interface RowInCellProps {
        readonly justifyContent: 'flex-start' | 'flex-end'
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

const RowInCell = styled.div<RowInCellProps>`
    display: flex;
    justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'flex-start'};
`;

const DayWrapper = styled.div`
    display: flex;
    height: 33px;
    width: 33px;
    align-items: center;
    justify-content: center;
`;

const CalendarGrid: FC = () => {
  //const totalDays = 42;
  const daysArray = [...new Array(42)];

  return (
    <GridWrapper>
      {daysArray.map((_, indx: number) => (
        <CellWrapper>
          <RowInCell justifyContent={'flex-end'}>
            <DayWrapper>{indx}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export default CalendarGrid;
