// Стили для Popup (окно подробного описания приёма ЛС)

import styled from "styled-components";

export const WrapperMyModal = styled('span')`
    /* по-умолчанию */
    display: none;
    position: fixed;
    z-index: 3;
    background-color: #E6E6E6;
    color: #565759;
    width:fit-content; // шириной в контент
    height: 250px;// положение меняется в src\service\handler_forPopup.tsx
    /* font-family: Roboto, serif; */
    line-height: 1;
    padding: 10px;
    border-radius: 2%;
    @keyframes shows {
        from { opacity: 0;}
        to { opacity: 1; }
    }
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
    cursor: pointer;
    border-radius: 4px;
    background-color: #565759;
    color: #E6E6E6;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
    transform: translate(+100%, +100%);
`