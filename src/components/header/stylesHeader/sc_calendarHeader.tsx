// styled for Header.tsx
import { Form } from 'react-router-dom';
import styled from 'styled-components';


export const DivWrapper = styled('div')`
  background-color: #2a282d;
  height: 4vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; // в строку
  @media (max-width: 834px) { // при max-width: 834px и меньше
    flex-direction: column; // в столбик
    height: 100%;
    padding: 1% 0;
  }
  a { // убрать с Link (которая в верстке <a> ) подчеркивание
    text-decoration: none;
  }
`;

export const TitleCalendar = styled('h3')`
  color: #dcdddd;
  margin: 0;
  font-size: 18px;
  padding-left: 16px;
`;
export const StyleIconPlus = styled.div`
  color: #dcdddd;
  padding-left: 10px;
  padding-top: 3px;
  padding-left: 4px;
`;
export const TitleCalendarWrapper = styled.div`
text-decoration: none;
  display: flex;
`;

//Buttons
export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: center;
  @media (max-width: 374px) {
    flex-direction: column; // в столбик вертикально
    justify-content: center;
    width: 100%;
  }
`;

interface IModeDateButtonProps {
  $extremeButtonLeft: boolean;
  $extremeButtonRight: boolean;
  $isCurrentModeDate?: boolean;
}

export const ModeDateButton = styled('button')<IModeDateButtonProps>`
  border: unset;
  height: 20px;
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 834px) { // при max-width: 834px и меньше
    margin: 3% 0;
  }  
  /* закругление углов крайних кнопок */
  ${(props) =>
    props.$extremeButtonLeft ? 'border-radius: 4px 0 0 4px ;' : null}
  ${(props) =>
    props.$extremeButtonRight ? 'border-radius: 0 4px 4px 0;' : null}
    /* активная кнопка меню */
    background-color: ${(props) =>
    props.$isCurrentModeDate ? '#E6E6E6;' : '#565759'};
  color: ${(props) => (props.$isCurrentModeDate ? '#565759' : '#E6E6E6;')};
`;

// кнопка "Login"
export const LoginWrapper = styled.div`
  display: flex;
`

export const ButtonLogin = styled('button')`
  border: unset;
  height: 20px;
  background-color: #565759;
  color: #E6E6E6;
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 7px;
`


// unput "search" через Form от react-router-dom
export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const FormRouterSearch = styled(Form)`
  background: #565759;
  margin-right: 7px;
  border-radius: 4px;
  display: flex;
`

export const InputSearch = styled('input')`
  border: none;
  outline: none;
  background: transparent;
  max-width: 200px;
  height: 20px;
  color: #E6E6E6;
  &::placeholder { 
   align-items: center;
}
`

export const InputButtonSearch = styled('button')`
  display: flex;
  align-items: center;
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  color: #E6E6E6;
  cursor: pointer;
`

