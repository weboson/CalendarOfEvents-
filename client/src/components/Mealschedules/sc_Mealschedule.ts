import styled from "styled-components";

// Form Wrapper (обертка для секотров формы)
export const FormWrappeer = styled.div`
  height: 77.8vh;
  background-color: #e6e6e6;
  padding: 3%;

  form {
    display: flex;
    flex: 600px;
    justify-content: space-between;
    min-height: 100%;
    flex-direction: column;
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    padding: 10px;
  }
  h2 {
    //! стили переопределены в MUI (RecipeForm.tsx)
  }
`;

// СПИСОК
// Для списка графиков питания
export const ListWrappeer = styled.div`
  height: 77.5vh;
  background-color: #e6e6e6;
  h1, h2, h3 {
    color: #2a282d;  
    text-align: left;
    margin: 0;
    color: #2a282d;
    padding: 2%;
  }
  h1 {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1.6em;
    }
  h2 {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1.6em;
    text-align: center;
  }
`;