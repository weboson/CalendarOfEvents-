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
  const medicine = takingMedications.find((item) => item.id == idMed);
  // при наведении на само окно "popup" - popup не будет исчезать.
  const hoverMouseOnMyPopup = (e: React.MouseEvent) => {
    // element
    const popup = document.querySelector('#popup');
    // const popup = e.target;
    // если мышь наведена на popup
    if (e.type == 'mouseover') {
      popup!.style.cssText += `
             display: flex;
             opacity: 0;
            animation: show 1s forwards;`;
    } else {
      // если мышь ушла с popup (mouseout)
      popup!.style.cssText = `
            display: none;`; // для анимации + в стилях еще | display: block - для отладки
    }
  };
  return (
    <WrapperMyModal id="popup" onMouseOver={hoverMouseOnMyPopup}>
      <h6>Схема приема препарата: </h6>
      <ul>
        <li>Наименование: <p>"{medicine?.title}"</p></li>
        <li>
          Способ приёма:&nbsp;<br />
          <p>{medicine?.depending
            ? medicine?.position == 'before'
              ? 'До ' +
                `${
                  medicine?.action == 'eating'
                    ? 'еды'
                    : medicine?.action == 'first breakfast'
                    ? 'завтрака'
                    : 'ужина'
                }`
              : medicine?.position == 'while'
              ? 'Вовремя ' +
                `${
                  medicine?.action == 'eating'
                    ? 'еды'
                    : medicine?.action == 'first breakfast'
                    ? 'завтрака'
                    : 'ужина'
                }`
              : 'После ' +
                `${
                  medicine?.action == 'eating'
                    ? 'еды'
                    : medicine?.action == 'first breakfast'
                    ? 'завтрака'
                    : 'ужина'
                }`
            : 'Независимо'}</p>
        </li>
        <li>Количество приёмов:&nbsp;
          <p>
          {medicine?.quantity} раза в
          {medicine?.unitTime == 'day'
            ? ' день'
            : medicine?.unitTime == 'week'
            ? ' в неделю'
            : 'в месяц'}
          </p>
        </li>
      </ul>
      <MyButton>Изменить</MyButton>
    </WrapperMyModal>
  );
};

export default MyPopup;
