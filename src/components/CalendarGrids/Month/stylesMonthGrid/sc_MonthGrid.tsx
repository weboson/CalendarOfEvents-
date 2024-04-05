// styles for CalendarGrid.tsx 
import { Moment } from 'moment';
import styled from 'styled-components'; // библиотека, которая упрощает стилизацию компонентов (CSS with JS)
export interface IGridWrapperProps {
  $isHeader?: number;
}


// Wrapper main
export const MonthWrapper = styled.div`
  min-height: 100%;
`

// for Cell
export const GridWrapper = styled.div<IGridWrapperProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    7,
    1fr
  ); // одно и тоже, как: 1fr 1fr 1fr 1fr 1fr 1fr

  //grid-template-rows: repeat(6, 1fr); // закомментил, т.к. months_header не уменьшается высота ячеек
  /* подложка (фон), чтобы сделать рамки ячеек */
  grid-gap: 1px;
  background-color: ${(props) => (props.$isHeader ? '#1e1f21' : '#484848')};
  ${(props) => props.$isHeader && 'border-bottom: 1px solid #484848'};
`;

// ts тип для css свойства ($ чтобы не было ошибки)
export interface ICellWrapperProps {
  $isWeekend?: boolean;
  $isHeader?: number;
  $isSelecctedMonth?: Moment | boolean;
}

export const CellWrapper = styled.div<ICellWrapperProps>`
  min-width: 120px;
  height: ${(props) => (props.$isHeader ? 24 : 135.5)}px;
  background-color: ${(props) => (props.$isWeekend ? '#272829' : '#1e1f21')};
/*если текущий месяц И еще выходной = такой цвет :
  если просто текущий месяц то = такой цвет 
  иначе (дни вне текущего месяца) по умолчанию = такой цвет*/
  ${(props => (
    (props.$isSelecctedMonth && props.$isWeekend) ? 'color: #919294' :
    (props.$isSelecctedMonth) ? 'color: #dddcdd' :
    'color: #555759'
  ))}

`;

// ts тип для css свойства
export interface IRowInCellProps {
  $justifyContent: string;
  $pr?: number;
}

export const RowInCell = styled.div<IRowInCellProps>`
  display: flex;
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : 'flex-start'};
  ${(props) => props.$pr && `padding-right: ${props.$pr * 8}px`}
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
`;



// контент каждого дня (ячейки месяца)
export const DayContent = styled('div')`
  max-height: 100%;
  width: 90%;
  /* скролл */
  overflow: auto;// если контент не вмещается, появляется скролл
  /* стили скролла */
  &::-webkit-scrollbar {
    // style scroll
    width: 10px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #565759;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #1e1f21; /* цвет плашки */
    border-radius: 0; /* закругления плашки */
    border: 1px solid #5a5959;
  }
`

// при наведении, поялвяется квадратик светло-серый
export const WrapperIcon = styled('div')`
  cursor: help; 
  display: inline;
  width: 100%;
  height: 100%;
  border-radius: 10%;

  &:hover {
    /* color: red; // не работает, почему стили перезаписываются в MonthGrid.tsx */
    background-color: #E6E6E6;

  }
`
