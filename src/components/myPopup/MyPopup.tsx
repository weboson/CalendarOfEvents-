//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC, useRef, useState } from 'react';
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

  // const divPopup = useRef();
  const [popup, setPopup] = useState(false)

  return (
    <WrapperMyModal
      id="IdPopup"
        // ref={popup}
      style={(popup) ? {display: "flex"} : {display: "none"}}  
      onMouseOver = {()=>setPopup(true)}
      onMouseOut= {()=>setPopup(false)}  
    >

      <h6>Схема приема препарата: </h6>
      <ul>
        <li>
          Наименование: <p>"{medicine?.title}"</p>
        </li>
        <li>
          Способ приёма:&nbsp;
          <br />
          <p>
            {medicine?.depending
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
              : 'Независимо'}
          </p>
        </li>
        <li>
          Количество приёмов:&nbsp;
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
