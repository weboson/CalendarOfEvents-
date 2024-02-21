// Стили для Popup (окно подробного описания приёма ЛС)

import styled from "styled-components";

export const WrapperMyModal = styled('div')`
    /* по-умолчанию */
    display: none; //! включать для отладки (и еще в src\service\handler_forPopup.tsx)
    position: fixed;
    margin: 20px;
    z-index: 3; // выше top-panel дней недели
    background-color: #E6E6E6; 
    color: #565759; 
    min-width: fit-content; // шириной в контент
    width: 350px;
    height: 250px;// положение меняется в src\service\handler_forPopup.tsx
    font-family: Roboto, serif;
    line-height: 1;
    padding: 10px;
    border-radius: 2%; 
    transition: "1s ease-in"; 
    h6 {
        font-size: 20px;
        line-height: 0px;
        margin: 25px 0 25px 0;
    }
    p {
        font-size: 17px;
        line-height: 1;
    }
    span {
        font-weight: bold;
    }

`; 

// кнопка "изменить"
export const MyButton = styled.button`
    border: unset;
    height: 40px;
    padding-right: 16px;
    padding-left: 16px;
    margin-bottom: 0px;
    font-weight: bold;
    /* cursor: pointer; */
    border-radius: 4px;
    background-color: #565759;
    color: #E6E6E6;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
    transform: translate(+100%, +100%);
`