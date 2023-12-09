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

//--- Left Section
export const LeftSection = styled.div`
    background-color: green;
    /* flex:50%; */
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`

//--- Right Section
export const RightSection = styled.div`
    background-color: blue;
    /* flex:50%; */
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`

//--- Top Left Section
export const TopLeftSection = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: space-between;
  height: 70%;
  width: 100%;
`
// Tablo (10 decemder, sunday)
export const DateBoard = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 50%;
  background-color: #1e1f21;
  color: #DCDDDD; // for title
`
// Title (10)
export const TitleDay = styled.div`
  display: flex;
  align-items: center; // выравневание по вретикали
  font-size: 12em;
  height: 80%;
  line-height: 80%; 
`
// Full Date (Sun, 10 December)
export const FullDate = styled.div`
  height: 20%;
  font-size: 1.8em;
`

// Grid Calendar
export const GridCalendar = styled.div`
  height: 50%;
  width: 50%;
  color: #DCDDDD;
  background-color: #1e1f21;
  border: 1px solid gray;
`
