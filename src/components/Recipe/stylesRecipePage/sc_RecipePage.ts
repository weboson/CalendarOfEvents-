// стили для страницы /resipes (рецепты)
import styled from "styled-components";

// main wrapper
export const WrapperRecipes = styled.div`
  height: 89vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  flex-wrap: nowrap; // в строку горизонтально (for adaptive)
  overflow-x: auto;
  /* justify-content:space-between; */
  background-color: #1e1f21;
  @media (max-width: 1210px) {
    flex-wrap: wrap; // столбик вертикальный  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
  }
`