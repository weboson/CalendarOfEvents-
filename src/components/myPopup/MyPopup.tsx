//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC } from 'react';
import React from 'react';
import { MyButton, WrapperMyModal } from './stylesMyPopup/sc_MyPopup';
import { useAppSelector } from '../../store/hooks';
// DataBase array
import takingMedications from '../../data/localDataBase/LocalDB_WaysUsing';

const MyPopup: FC = () => {
  //Redux-toolkit - из hooks.tsx -
  // получили id лекарства
  const idMed = useAppSelector((state) => state.popupData);
// нашли сам объект лекарства по его id
  const medicine = takingMedications.find((item) => item.id == idMed)
  // при наведении на само окно "popup" - popup не будет исчезать.
  const hoverMouseOnMyPopup = (e: React.MouseEvent) => {
    // element
    const popup = document.querySelector('#popup');
    // const popup = e.target;
    // если мышь наведена на popup
    if (e.type == 'mouseover') {
      popup!.style.cssText += `
             display: block;
             opacity: 0;
            animation: show 1s forwards;`;
    } else {
     // если мышь ушла с popup (mouseout)
      popup!.style.cssText = `
            display: none;`; // для анимации + в стилях еще | display: block - для отладки
    }
  };
  return (
    <WrapperMyModal
      id="popup"
      onMouseOver={hoverMouseOnMyPopup}
    > 
      <h6>Схема приема препарата: </h6>
      <ul>
        <li>Наименование: "{medicine?.title}"</li>
        <li>Способ приёма:&nbsp;
          {(medicine?.depending) ? 
          ((medicine?.position == 'before'
            ? 'До '
            : medicine?.position == 'while'
            ? 'Вовремя '
            : 'После ') + `[${medicine?.action}]`) : 
            'Независимо'}</li>
        <li>        Количество:&nbsp;
          {medicine?.quantity} раза в [{medicine?.unitTime}]</li>
      </ul>
      <MyButton>Изменить!</MyButton>
    </WrapperMyModal>
  );
};

export default MyPopup;
