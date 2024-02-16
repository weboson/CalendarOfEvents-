//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import {FC} from 'react';

const MyPopup:FC = () => {
    

    // при наведении на само окно "popup" - popup не будет исчезать.
    const hoverMouseOnMyPopup = (e) => {
        // element
        const popup = document.querySelector('#popup');
         // если мышь наведена на popup
        if (e.type == 'mouseover') {

            popup!.style.cssText += `
             display: block;
           `;
          } else { // если мышь ушла с popup (mouseout)
            popup!.style.cssText += `
            display: none;
          `;
          }
    }
    return (

        <div 
        onMouseOver={(e) => hoverMouseOnMyPopup(e)}
        onMouseOut={(e) => hoverMouseOnMyPopup(e)}
        id="popup"style={{
            color: "red", width: "100px", height: "200px", 
            display: "none", position: 'fixed', top: "300px", 
            left: "600px", zIndex: 3,  
            }}>
            МОДАЛЬНОЕ ОКНО
        </div>
    );
};

export default MyPopup;