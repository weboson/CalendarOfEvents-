//! Обработчик для события onMouseOver и onMouseOut
// (еще в самом myPopup.tsx есть событие - чтобы popup не исчезал при наведение на самого popup)
export const hoverMouseOnMedicine = (e) => {
    // console.log(e.target)
    // console.log(`${e.clientX} ${e.clientY}`)
    // console.log(e.type)
    const top = e.clientY;
    const left = e.clientX;
    const cell = document.querySelector('#popup');
    
    // если мышь наведена на элемент
    if (e.type == 'mouseover') {
      cell!.style.cssText += `
       top: ${top-250}px;
       left: ${left}px;
       display: block;
     `;
    } else { // если мышь ушла с элемента (mouseout)
      cell!.style.cssText += `
      display: none;`; // block - для отладки (еще в MyPopup.tsx)
    }    
  } 