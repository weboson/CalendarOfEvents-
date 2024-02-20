//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC } from 'react';
import React from 'react';
import { MyButton, WrapperMyModal } from './stylesMyPopup/sc_MyPopup';
import { useAppSelector } from '../../store/hooks';



const MyPopup:FC<IProps> = () => {

      //Redux-toolkit - из hooks.tsx - 
  // получили данные
  const dataPopup = useAppSelector((state) => state.popupData);

    // при наведении на само окно "popup" - popup не будет исчезать.
    const hoverMouseOnMyPopup = (e: React.MouseEvent) => { // https://habr.com/ru/articles/783858/
        
        // element
        // const popup = document.querySelector('#popup');
        const popup = e.target;
         // если мышь наведена на popup
        if (e.type == 'mouseover') {
            popup!.style.cssText = `
             display: block;`;
          } else { // если мышь ушла с popup (mouseout)
            popup!.style.cssText = `
            display: none;
            animation: shows 1s;`; // для анимации + в стилях еще | display: block - для отладки
          }
    }
    return (
        // <div onMouseOver={hoverMouseOnMyPopup} onMouseOut={hoverMouseOnMyPopup}
        //      id="popup">{data.title}</div>
        <WrapperMyModal id="popup"
            onMouseOver={hoverMouseOnMyPopup}
            onMouseOut={hoverMouseOnMyPopup}
        >
            Схема приёма препарата{dataPopup}
        </WrapperMyModal>
    );
};

export default MyPopup;

