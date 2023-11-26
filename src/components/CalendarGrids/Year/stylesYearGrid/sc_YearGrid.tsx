import styled from 'styled-components'; // библиотека, которая упрощает стилизацию компонентов (CSS with JS)
export interface IGridWrapperYearProps {
}


// for Main Grid 4 * 3 example
export const GridWrapperYear = styled.div<IGridWrapperYearProps>`
  display: grid;
  min-width: 986px;
  background-color: #272829;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  border-bottom: 6px solid '#484848';
`;


// Cell Months
export const WrapperMothCell = styled.div`
  border: solid 1px blue;
  margin: 10px;
  padding: 10px;
  color: white;
  
`
// Title Month
export const MothTitle = styled.div`
  font-weight: bold;
`



// Inner Grid for months
export const СellMonths = styled.div`
  width: 235px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: solid 1px red;
  grid-gap: 1px;
  background-color: '#272829';
  padding: 0 10px;
  margin-top: 40px;
`


// For Cell Days
export const CellDay = styled.div`
  text-align: center;
  color: #ffffff;
`

