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
