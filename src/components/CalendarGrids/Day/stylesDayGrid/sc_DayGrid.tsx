// styles for DayGrid.tsx
import styled from 'styled-components';

// Wrapper main block
export const WrapperBlock = styled.div`
  height: 89vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  flex-wrap: nowrap; // в строку горизонтально (for adaptive)
  overflow-x: auto;
  /* justify-content:space-between; */
  background-color: #1e1f21;
  @media (max-width: 1210px) {
    flex-wrap: wrap; // столбик вертикальный  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
  }
`;

//!--- Left Section
export const LeftSection = styled.div`
  background-color: #1e1f21;
  min-width: 605px;
  /* для адаптива */
  @media (max-width: 1210px) {
    flex: 100%;
  }
`;

//!--- Top Left Section
export const TopLeftSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid grey;
`;
// Tablo (10 decemder, sunday)
export const DateBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: #1e1f21;
  color: #dcdddd; // for title
  /* border: 1px solid grey; */
`;
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
`;
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
`;

//! Grid Calendar
export const GridCalendarSection = styled.div`
  width: 55%;
  color: #dcdddd;
  background-color: #1e1f21;
  @media (max-width: 1210px) {
    flex: 50%;
  }
`;
export const WrapperWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  padding-top: 5px;
`;
export const CellWeek = styled.div`
  font-size: 12px;
  align-items: end;
  color: #565759;
`;

export const СellMonth = styled.div`
  background-color: #1e1f21;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  padding-top: 10px;
`;
// For Cell Days
interface ICellDayProps {
  $isWeekend?: boolean;
  $isCurrentDay?: boolean;
  $isCurrentDays?: boolean;
}

export const CellDay = styled.div<ICellDayProps>`
  padding: 5px 0;
  text-align: center;
  ${(props) =>
    props.$isWeekend
      ? 'color: #212121'
      : props.$isCurrentDay
      ? 'color: red'
      : props.$isCurrentDays
      ? 'color: #ffffff'
      : 'color: #919294'};
`;

//! Buttom Left Section
export const BottomLeftSection = styled.div`
  height: 65%;
  /* border: 1px solid grey; */
`;



//!--- Right Section
export const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #1e1f21;
  width: 100%;
  /* flex:50%; */
  /* min-width: 605px; */
  /* для адаптива */
  @media (max-width: 1210px) {
    /* flex-wrap: wrap; */
    flex: 100%;
  }
`;

//! Grid Day
export const WrapperGridDay = styled.div`
  display: flex;
  background-color: #1e1f21;
  min-width: 100%;
  height: 100%; 
  overflow-y: scroll;
  /* стили скролла */
  &::-webkit-scrollbar {
    // style scroll
    width: 18px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #565759;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #1e1f21; /* цвет плашки */
    border-radius: 0; /* закругления плашки */
    border: 1px solid #5a5959;
  } /* padding вокруг плашки */
`;

// Wrapper left panel (24 hours) GridDay
export const WrapperSidePanel = styled.div`
  flex-direction: row;
  float: left;
`;

interface IHourSidePanel {
  $currentSideHour: boolean;
}
// Hours
export const WrapperListHalfHours = styled.div<IHourSidePanel>`
  ${(props) => (props.$currentSideHour ? 'color: red;' : 'color: #E6E6E6;')}
  background-color: #1e1f21;
  text-align: center;
  min-height: 230px;
  width: 5vw;
  /* padding: 10px; */
  border-top: 1px solid #565759;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
`;

// Grid
export const WrapperList = styled.div`
  width: 100vw;
`;

// Half Hours
interface IHourContent {
  $currentHalfHour: boolean;
  // $currentWarning: boolean;
}

export const HalfHoursContent = styled.div<IHourContent>`
  background-color: #1e1f21; // цвет по-умолчанию
  flex-direction: row;
  width: 100%;
  height: 115px;
  border-top: 1px solid #565759;
  /* если контент (лекарства) слишком много в блоке, пояляется сролл */
  overflow-y: auto; 
  /* стили скролла */
  &::-webkit-scrollbar {
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
  ${(props) => 
  /* текущая по времени ячейка */
    props.$currentHalfHour ? 'background-color: #3d3e3f' : null};
`