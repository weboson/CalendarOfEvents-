import styled from 'styled-components'; // библиотека, которая упрощает стилизацию компонентов (CSS with JS)
export interface IGridWrapperYearProps {
}


// for Main Grid 4 * 3 example
export const GridWrapperYear = styled.div<IGridWrapperYearProps>`
  display: grid;
  background-color: #272829;
  grid-template-columns: repeat(4, 1fr); 
  grid-column-gap: 30px;
  grid-row-gap: 10px;
  border-bottom: 6px solid '#484848';
  padding: 10px;
  /* border: solid 1px green; */
`;


// Cell Months
interface IWrapperMothCellProps {
  $isCurrentMonth?: boolean
}

export const WrapperMothCell = styled.div<IWrapperMothCellProps>`
  margin: 10px;
  padding: 10px;
  /* border: solid 1px blue; */
  ${(props) => (props.$isCurrentMonth) ? 'color: red' : 'color: white'}
  
`
// Title Month
export const MothTitle = styled.div`
  font-weight: bold;
`



// Inner Grid for months
export const СellMonths = styled.div`
  background-color: #565759;
  width: 235px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  padding: 0;
  margin-top: 5px;
  /* border: solid 1px red; */
`


// Week (дни недели)
export const WrapperWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  padding-top: 5px;
`
export const CellWeek = styled.div`
  font-size: 12px;
  align-items: end;
  color: #565759;
`

// Current Day
export const CurrentDay = styled.div`
  color: red;
`


// For Cell Days
interface ICellDayProps  {
  $isWeekend?: boolean
  $isCurrentDay?: boolean
  $isCurrentDays?: boolean
}

export const CellDay = styled.div<ICellDayProps>`
  text-align: center;
  grid-gap: 1px;
  background-color: #272829;
  ${(props => (
    (props.$isWeekend) ? 'color: #212121' : 
    (props.$isCurrentDay) ? 'color: red' :
    (props.$isCurrentDays) ? 'color: #ffffff' :
    'color: #919294'
     
  ))};
`


