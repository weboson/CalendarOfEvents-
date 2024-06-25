//! основные стили используются через Material-UI (RecipeForm.tsx) 
// стили для страницы /resipes (рецепты)
import styled from 'styled-components';

//! main wrapper
export const WrapperRecipes = styled.div`
  height: 89vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  /* justify-content:space-between; */
  /* background-color: #1e1f21; */
  background-color: #2a282d;
  @media (max-width: 1210px) {
    flex-wrap: nowrap; // столбик вертикальный  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
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
export const FromWrappeer = styled.div`
   display: flex;
  flex-direction: column; 
  flex-direction: row; // элементы располагаются в строку, слева направо.
  flex-wrap: nowrap; // в строку горизонтально (for adaptive)
  width: 100%;
  height: 100%;
  background-color: #E6E6E6;
  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
  }
  h2 { //! стили переопределены в MUI (RecipeForm.tsx)
    /* color: #565759; */
    /* font-weight: 400; */
    /* box-sizing: border-box;
    font-family: Roboto, Helvetica, Arial, sans-serif; */
    /* margin: 2%; */
  } 
`;

//! формы поделены на 4 шага (сектора) шириной по 25%
export const FormStep = styled.div`
  width: 25%;
  display: flex; 
  flex-direction: column;
  border: 1px solid #B1B1B1;
  border-radius: 5px;
  margin: 10px 10px 0 10px; // внизу 0, чтобы не было двойного margin между блоками
  padding: 10px;
`
//Step
export const TearFrame = styled.div`
  color: #B1B1B1;
`

// Input + label
export const InputWrapper = styled.div`
    /* font-family: 'Raleway', sans-serif;
    color: #1e1f21;
    margin-left: 8%;
    width: 100%; */
    /* background-color: red; */
  input, label {
    /* height: 100%;
    color: #565759;
    font-size: 1.3rem;
    line-height: 1.2; */
  }
  label {
    /* font-weight: 400;
    margin-bottom: 1%;
    margin-left: 2%; */
  }
  input {
  /* input[type=text] { */
  /* font-size: 2em; */
    /* padding: 2%;
    border: 1px solid #bdbdbd;
    border-radius: 0.35rem;
    font-style: italic; */
    /* width: 100%; */
    /* border-radius: 10%; */
    &:focus {
      /* color: #212529;
      background-color: #fff;
      border-color: #bdbdbd;
      outline: 0;
      box-shadow: 0 0 2rem 0.2rem rgba(158, 158, 158, 0.25); */
    }
    &::placeholder {
      
    }
    button {
      
    }

  }
`;


