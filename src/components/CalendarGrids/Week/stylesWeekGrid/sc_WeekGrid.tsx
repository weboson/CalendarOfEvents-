// styles for WeekGrid.tsx
import styled from 'styled-components';

// main block
export const GridWrapper = styled.div`
  display: block;
  background-color: #1e1f21;
  min-width: 100%;
  height: 88.5vh; //! чтобы скролл window не появляся
  overflow-y: scroll;
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
  min-height: 230px;
  padding: 10px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
`;

// Wrapper Header
export const WrapperTopPanelAndContent = styled.div`
  display: grid;
  //flex-wrap: wrap; // хз - и без него робит
  grid-template-columns: repeat(7, 1fr);
`;
// Day of Week + Date + Column
export const WrapperColumn = styled.div`
/* ${(props) => (props.$currentDay ? 'width: 100%;' : 'width: 40px;')} */
  
`; // для обёртки

interface IDayOfWeek {
  $currentDay: boolean;
}

export const DayOfWeek = styled.div<IDayOfWeek>`
  position: sticky;
  top: 0; // fixed panel
  z-index: 1;
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
  position: relative;
  display: block;
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
  /* если контент (лекарства) слишком много в блоке, пояляется сролл */
  overflow-y: auto; 
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
  
  ${(props) => 
  /* текущая по времени ячейка */
    props.$currentHour
      ? 'background-color: #3d3e3f'
      : 'background-color: #1e1f21'};
   /* Для того, чтобы текст не растягивал блок, а ставилось в конце ...  */
    /* max-width: 260px; */
   //white-space: nowrap; /* Текст не переносится */
    //overflow: hidden; /* Обрезаем всё за пределами блока */
    //text-overflow: ellipsis; /* Добавляем многоточие */
`;


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


//! для всплывающей подсказки (html атрибут data-title)
export const FoodTooltip = styled.span`
  	&::before {
		position: absolute;
		z-index: 2;
		top: 100%;
		right: 0%;
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
