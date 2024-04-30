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
  font-size: 1.6em;
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
  width: 60vw;
`;

// Half Hours
interface IHourContent {
  $currentHalfHour: boolean;
  $currentWarning: boolean;
}

export const HalfHoursContent = styled.div<IHourContent>`
  position: relative; // чтобы icon food были справа внизу
  background-color: #1e1f21; // цвет по-умолчанию
  flex-direction: row;
  width: 100%;
  height: 115px;
  border-top: 1px solid #565759;
  border-right: 1px solid #565759;
  /* если контент (лекарства) слишком много в блоке, пояляется сролл */
  overflow-y: auto; 
  /* стили скролла */
  &::-webkit-scrollbar {
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
  }
  ${(props) => 
  /* текущая по времени ячейка */
    props.$currentHalfHour ? 'background-color: #3d3e3f' : null};
  
  ${(props) => 
  // Warning: текущая по времени ячейка совпадает со временем приёма лекарств 
    props.$currentWarning && 
  // пульсация красного цвета
    `opacity: 1;
      animation: pulse 4s ease-in-out infinite; // Указываем название анимации, время, тип, и нужно ли её повторять

      @keyframes pulse {
        0% {
          background-color: #601616c4; 
        }
        50% {
          background-color: #3d0d0d80; 
        }
        100% {
          background-color: #601616c4; 
        }
      }
`};
`

//! TimeLine
// временная шкала
export const Line = styled.div`
  height: 2%;
  /* width присваивается в скрипте в TimeLine.tsx */
  /* width: 1.6%; // первая минута: 100% / 60 = 1,666...  */
  /* background-color: #E6E6E6; */
  /* градиент методом box-shadow */
  background: #00ffd5;
  box-shadow: 0 -200px 100px -120px skyblue inset; // skyblue - это цвет
  border-radius: 50%;
  animation: background 3s infinite alternate;
/* анимация градиента */
@keyframes background {
  50% {
    background: skyblue;
    box-shadow: 0 -200px 100px -100px yellowgreen inset;
  }
}
/* второй способ анимированного градиента. Минус в том, что я не смог использовать %, только px в background-position */
  /* background-position: 0;
  background: linear-gradient(to right, #63e4a1, #591cf3, #fffcc0, #00ffea, #3ede8b ); // градиент
  animation: background 10s infinite linear; 
  @keyframes background {
  100% {
    background-position: 1000px;
  }  */
/* } */
`

//! Режим дня (Moon/ Sun) 
//* Icons
//* Not Styled-components - sc не работают с svg от react-icons
// For Daily Regimes (стилизация иконок "GoSun" и "GoMoon")
// GoSun 
export const stylesSun = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
}
// GoMoon
export const stylesMoon = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
}


//! Для Food 
export const StyleIconFood = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fffb00;
    margin: 0px 3px 3px 0px;
    &:hover {
      color: red;
    }
`

//! для всплывающей подсказки (html атрибут data-title)
export const FoodTooltip = styled.span`
  	&::before {
    position: absolute;
    bottom: 20%;
		z-index: 2;
		right: 2%;
		/* margin: -10px 0 0 -20px; */
		padding: 5px 10px;
		background: #E6E6E6;
    color: #565759;
    font-weight: bold;
		content: attr(data-title);
		transition: .2s ease;
		transition-property: opacity, visibility;
		opacity: 0;
		/* visibility: hidden; */
		/* pointer-events: none; */

    //* 10s в начале будет показан (для отладки)
		animation: showTitles 0s linear; 
		@keyframes showTitles {
			0%, 90% {
				visibility: visible;
				opacity: 1;
			}	
			100% {
				visibility: hidden;
				opacity: 0;
			}
		}
	// *******************************************
  }	
	&:hover {
		&::before {
			opacity: 1;
			visibility: visible;
		}
	}
`
//! Medicines
// стопка Medicines
export const WrapperFlexMedicines = styled.span`
  display: flex;
  flex-wrap: wrap; // перенос на следующую строку, если не влазиет (то есть scroll-x точно не будет)
`
// для текста лекарства
export const WrapperSpanDay = styled.span`
    cursor: help;
    color: black;
    font-size: 2em;
    /* display: inline; */
    /* width: 100%; */
    height: 100%;
    &:hover {
      background-color: #E6E6E6;
      color: white;
      padding: 10px;
      text-decoration: underline;

}
`
