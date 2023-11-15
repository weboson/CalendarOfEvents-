// styles for Grid Calendar
import styled from 'styled-components'; // библиотека, которая упрощает стилизацию компонентов (CSS with JS)

// for Cell
export const GridWrapper = styled.div`
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

// ts тип для css свойства
export interface ICellWrapperProps {
  $isWeekend: boolean;
}
export const CellWrapper = styled.div<ICellWrapperProps>`
  min-width: 140px;
  min-height: 80px;
  background-color: ${props => (props.$isWeekend) ? '#272829' : '#1e1f21'};
  color: #dddcdd;
`;


// ts тип для css свойства
export interface IRowInCellProps {
  $justifyContent: string;
}

export const RowInCell = styled.div<IRowInCellProps>`
  display: flex;
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : 'flex-start'};
`;

export const DayWrapper = styled.div`
  display: flex;
  height: 33px;
  width: 33px;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

export const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`