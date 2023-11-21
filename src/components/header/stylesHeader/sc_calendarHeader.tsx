// styled for Header.tsx
import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const DivWrapper = styled('div')`
  background-color: #2a282d;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
`;

//Buttons
export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: center;
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

// unput "search" через Form от react-router-dom
export const SearchWrapper = styled.div`

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

