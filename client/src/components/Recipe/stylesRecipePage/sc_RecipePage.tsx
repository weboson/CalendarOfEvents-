//! основные стили используются через Material-UI (RecipeForm.tsx)
// стили для страницы /resipes (рецепты)
import styled from 'styled-components';

//! main wrapper
export const WrapperRecipes = styled.div`
  height: 100%; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  background-color: #2a282d;
  @media (max-width: 1210px) {
    flex-wrap: nowrap; // столбик вертикальный  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
  }
`;

//! Menu: 'Add new' & 'Recipes'
export const RecipeMenuWrapper = styled.div`
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #2a282d;
`;

interface IRecipeMenuUlProps {
  $isActiveModeDate: boolean;
  $borderRadiusLeft: boolean;
  $borderRadiusRight: boolean;
}

export const RecipeMenuUl = styled.ul<IRecipeMenuUlProps>`
  list-style: none;
  display: flex;
  align-items: center; // текст по центру по вертикали
  flex-direction: row; // в строку
  height: 20px;
  padding: 0; // убрать отступ слева у ul
  font-weight: 500; // bold = 500
  cursor: pointer;
  ${(props) =>
    props.$isActiveModeDate
      ? 'background-color: #e6e6e6; color: #565759;'
      : 'background-color: #565759; color: #e6e6e6;'}
  ${(props) => (props.$borderRadiusLeft ? 'border-radius: 4px 0 0 4px;' : null)}
      ${(props) =>
    props.$borderRadiusRight ? 'border-radius: 0 4px 4px 0;' : null}
  li {
    padding-right: 16px;
    padding-left: 16px;
    font-size: 1em;
  }
`;

//! Headline block  / Wrapper
export const HeadlineBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background: #00ffd5;
  box-shadow: 0 -200px 100px -120px skyblue inset; // skyblue - это цвет
  animation: background 10s infinite alternate;
  /* анимация градиента */
  @keyframes background {
    50% {
      background: skyblue;
      box-shadow: 0 -200px 100px -100px yellowgreen inset;
    }
  }
`;

// Wrapper H1 (чтобы разместить с иконкой в строку)
export const HeadlineWrapper = styled.div`
  display: inline;
  /* заголовок */
  h1 {
    display: flex;
    align-items: center; // текс по центру по вертикали
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    text-align: center;
    margin: 10px;
    font-size: 2.6em;
    color: #2a282d;
    height: 100%;
  }
`;

// Form Wrapper (обертка для секотров формы)
export const FormWrappeer = styled.div`
  height: 77.5vh;
  background-color: #e6e6e6;

  form {
    display: flex;
    flex-wrap: wrap; // при сжатии переходят на новую строку
  }
  h2 {
    //! стили переопределены в MUI (RecipeForm.tsx)
  }
`;

//! общие стили для всех шагов
export const FormStep = styled.div`
  display: flex;
  flex: 600px;
  justify-content: space-between;
  min-height: 100%;
  flex-direction: column;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  margin: 10px 10px 0 10px; // внизу 0, чтобы не было двойного margin между блоками
  padding: 10px;
`;
//Steps
export const TearFrame = styled.div`
  color: #b1b1b1;
`;

// Для списка рецептов
export const ListWrappeer = styled.div`
  height: 77.5vh;
  background-color: #e6e6e6;
`;
