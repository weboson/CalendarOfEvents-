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

//! Для списка рецептов
export const Background = styled.div`
  display: flex;
  justify-content: center;
  min-height: 77.9vh;
  background-color: #e6e6e6;
`;

// цвет за сеткой (для рамок)
export const GapBackground = styled.div`
  width: 90%;
  height: 90%;
  background-color: #565759;
`;
//* заголовки
export const GridTitle = styled.div`
  display: grid;
  grid-gap: 1px; // промежутки между ячейками
  /* для адаптива: https://youtu.be/Wq5tzAaYfxA?list=PLe90t_Ab7ztPn7mXL0TyM5VKWhEBw-BSL&t=238 */
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 8fr)); */
  grid-template-columns: 3% 15% 7% 30% repeat(3, 1fr) 5%; // размеры колонок шапки таблицы
  @media (max-width: 1200px) {
    display: none;
  }
`;
export const CellColumn = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: 500;
  color: #2a282d;
  background-color: #e6e6e6;
  padding: 2% 0;
`;

//* рецепты
// обертка для адптации (разбивает блоки на 2 и 1 ряда)
export const GridWrapperRecipes = styled.div`
  grid-template-columns: repeat(1, 1fr);
`;
// горизонтальные ряды рецептов
export const GridRecipes = styled.div`
  display: grid;
  grid-gap: 1px;
  margin: 1px 0; // горизональные рамки */
  grid-template-columns: 3% 15% 7% 30% repeat(3, 1fr) 5%; // размеры колонок контента таблицы
`;

// ячейка
export const CellRecipe = styled.div`
  font-family: 'Raleway', sans-serif;
  /* text-align: center; */
  color: #2a282d;
  background-color: #e6e6e6;
  padding: 2%;
  white-space: wrap;
  font-size: 1.4em;
  button {
    font-size: 1.2em;
  }
`;
