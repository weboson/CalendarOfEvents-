// styles for WeekGrid.tsx
import styled from 'styled-components';

// main block
export const GridWrapper = styled.div`
  display: block;
  background-color: #1e1f21;
  max-height: 694px;
  min-width: 1210px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    // style scroll
    width: 18px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #e6e6e6;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #565759; /* цвет плашки */
    border-radius: 0px 0px 9px 0; /* закругления плашки */
    border: 1px solid #e6e6e6;
  } /* padding вокруг плашки */
`;
// side panel block
export const WrapperSidePanel = styled.div`
  display: block;
  float: left;
`;
// Day (side panel)
export const DaySidePanel = styled.div`
  background-color: #1e1f21;
  border-bottom: 1px solid #565759;
  color: white;
  text-align: center;
  padding-bottom: 8px;
  position: sticky; // fixed panel
  top: 0; // fixed panel
  width: 100%;
`;
// Hours (side panel)
export const HoursSidePanel = styled.div``;
// Item Hour
interface IHourSidePanel {
  $currentSideHour: boolean;
}

export const HourSidePanel = styled.div<IHourSidePanel>`
  ${(props) => (props.$currentSideHour ? 'color: red;' : 'color: #E6E6E6;')}
  background-color: #1e1f21;
  text-align: center;
  min-height: 84px;
  padding: 10px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
`;

// Wrapper Header
export const WrapperTopPanelAndContent = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
// Day of Week + Date + Column
export const WrapperColumn = styled.div``; // для обёртки

interface IDayOfWeek {
  $currentDay: boolean;
}

export const DayOfWeek = styled.div<IDayOfWeek>`
  position: sticky; // fixed panel
  top: 0; // fixed panel
  background-color: #1e1f21;
  border-bottom: 1px solid #565759;
  ${(props) => (props.$currentDay ? 'color: red;' : 'color: white;')}
  padding-left: 20px;
  padding-bottom: 8px;
`;

// Hours Columm
interface IHourContent {
  $currentHour: boolean;
}

export const HourContent = styled.div<IHourContent>`
  display: block;
  /* display: grid;
    background-color: #fff;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 10px; */
  width: 100%;
  height: 42px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
  ${(props) =>
    props.$currentHour
      ? 'background-color: #3d3e3f'
      : 'background-color: #1e1f21'}
`;


//* Icons
//* Not Styled-components - sc не работают с svg от react-icons
// For Daily Regimes (стилизация иконок "GoSun" и "GoMoon")
// GoSun 
export const stylesSun = {
  color: '#f4fbab',
  float: 'right',
  margin: '1px 1px 0 0',
}
// GoMoon
export const stylesMoon = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
}
// For Diet (Стилизация иконки "food")
export const stylesFood = {
  color: '#4fa2d5',
  // color: '#a12a2a',
  float: 'left',
  margin: '0px 0px 1px 1px',
}
