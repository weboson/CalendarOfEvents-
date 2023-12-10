// styles for DayGrid.tsx
import styled from "styled-components";

// Wrapper main block
export const WrapperBlock = styled.div`
    display: flex;
    flex-wrap: wrap; // обязательно для адаптива
    overflow-x: auto;
    /* justify-content:space-between; */
    background-color: #1e1f21;
    min-height: 694px;
    min-width: 1210px;

`

//!--- Left Section
export const LeftSection = styled.div`
    background-color: #1e1f21;
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`

//!--- Right Section
export const RightSection = styled.div`
    background-color: #1e1f21;
    /* flex:50%; */
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`

//!--- Top Left Section
export const TopLeftSection = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: space-between;
  height: 35%;
  width: 100%;
  /* border: 1px solid grey; */
`
// Tablo (10 decemder, sunday)
export const DateBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: #1e1f21;
  color: #DCDDDD; // for title
  /* border: 1px solid grey; */
`
// Title (10)
export const TitleDay = styled.div`
  display: flex;
  height: 70%;
  align-items: center; // выравневание по вретикали
  justify-content: center;
  font-size: 10em;
  line-height: 100%; 
  /* border: 1px solid grey; */
  @media (max-width: 1210px) {
    font-size: 8em;
  }
  
`
// Full Date (Sun, 10 December)
export const FullDate = styled.div`
  display: flex;
  height: 30%;
  /* padding-bottom: 18%; */
  font-size: 1.3em;
  /* text-align: center; */
  padding-left: 5%;
  align-items: center; // выравневание по вретикали
  justify-content: center;
`

// Grid Calendar
export const GridCalendarSection = styled.div`
  width: 55%;
  color: #DCDDDD;
  background-color: #1e1f21;
  /* border: 1px solid gray; */
`
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

export const СellMonth = styled.div`
  background-color: #1e1f21;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  padding-top: 10px;
`
// For Cell Days
interface ICellDayProps  {
  $isWeekend?: boolean
  $isCurrentDay?: boolean
  $isCurrentDays?: boolean
}

export const CellDay = styled.div<ICellDayProps>`
  padding: 5px 0;
  text-align: center;
  ${(props => (
    (props.$isWeekend) ? 'color: #212121' : 
    (props.$isCurrentDay) ? 'color: red' :
    (props.$isCurrentDays) ? 'color: #ffffff' :
    'color: #919294'
   
  ))};
`


//!===Buttom Left Section
export const BottomLeftSection = styled.div`
  height: 65%;
  /* border: 1px solid grey; */
`