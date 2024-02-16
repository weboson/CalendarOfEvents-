//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import {FC} from 'react';
import { ContentMyModal, MyButton, WrapperMyModal } from './stylesMyPopup/sc_MyPopup';

interface IProps {
    data: object
  }


const MyPopup:FC<IProps> = ({data}) => {
    

    // при наведении на само окно "popup" - popup не будет исчезать.
    const hoverMouseOnMyPopup = (e) => {
        // element
        const popup = document.querySelector('#popup');
         // если мышь наведена на popup
        if (e.type == 'mouseover') {

            popup!.style.cssText += `
             display: block;`;
          } else { // если мышь ушла с popup (mouseout)
            popup!.style.cssText += `
            display: none;
            animation: shows 1s;`; // для анимации + в стилях еще | display: block - для отладки
          }
    }
    return (

        <WrapperMyModal
            id="popup"
            onMouseOver={(e) => hoverMouseOnMyPopup(e)}
            onMouseOut={(e) => hoverMouseOnMyPopup(e)}
        >
            <h6>Схема приема препарата</h6>
            <p>Наименование: <span>"{data.title}"</span></p>
            <p>Способ приёма:&nbsp; 
                <span>
                    {(data.position == 'before') ? 'До' : 
                    (data.position == 'while') ? 'Вовремя' : 'После'}&nbsp; 
                    [{data.action.title}]
                </span>
            </p>
            <p>Количество:&nbsp;
                <span>{data.quantity} раза в [{data.unitTime}]</span>
            </p>
            <MyButton>Изменить</MyButton>
        </WrapperMyModal>
    );
};

export default MyPopup;