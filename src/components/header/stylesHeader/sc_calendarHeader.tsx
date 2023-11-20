// styled for Header.tsx
import styled from 'styled-components';


export const DivWrapper = styled('div')`
  background-color: #2a282d;
  height: 36px;
  display: flex;
  justify-content:space-between;
  align-items:center;
`

export const TitleCalendar = styled('h3')`
    color: #DCDDDD;
    margin: 0;
    font-size: 18px;
    padding-left: 16px;

`
export const StyleIconPlus = styled.div`
    color: #DCDDDD;
    padding-left: 10px;
    padding-top: 3px;
    padding-left: 4px;
`
export const TitleCalendarWrapper = styled.div`
    display: flex;
`

//Buttons
export const ButtonsWrapper = styled('div')`
    display:flex;
    justify-content:center;
 
`

interface IModeDateButtonProps  {
    $extremeButtonLeft: boolean
    $extremeButtonRight: boolean
    $isCurrentModeDate?: boolean
}
    
export const ModeDateButton = styled('button')<IModeDateButtonProps>`
    border: unset;
    height: 20px;

    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold;
    cursor: pointer;
    /* закругление углов крайних кнопок */
    ${(props) => props.$extremeButtonLeft ? 'border-radius: 4px 0 0 4px ;' : null}
    ${(props) => props.$extremeButtonRight ? 'border-radius: 0 4px 4px 0;' : null}
    /* активная кнопка меню */
    background-color: ${(props) => props.$isCurrentModeDate ? '#E6E6E6;' : '#565759'};
    color: ${(props) => props.$isCurrentModeDate ? '#565759' : '#E6E6E6;'}; 
`;