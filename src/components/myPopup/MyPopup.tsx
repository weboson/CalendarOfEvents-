//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC, useState } from 'react';
import { MyButton, WrapperMyModal } from './stylesMyPopup/sc_MyPopup';
import { useAppSelector } from '../../store/hooks';
// DataBase array
import takingMedications from '../../data/localDataBase/LocalDB_WaysUsing';

const MyPopup: FC = () => {
  //Redux-toolkit - из hooks.tsx -
  // получили id лекарства
  const idMed = useAppSelector((state) => state.popupData); // изменение состояния (useAppDispatch) в UsingMedicines.tsx
  // нашли сам объект лекарства по его id
  const medicine = takingMedications.find((item) => item.id == idMed);
  const [popup, setPopup] = useState(false);

  return (
    <WrapperMyModal
      id="IdPopup"
      style={popup ? { display: 'flex',  animation: '', } : { animation: 'hidden 1s forwards'}}
      onMouseOver={() => setPopup(true)}
      onMouseOut={() => setPopup(false)}
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
              ? `За ${medicine.interval.hour} ${(medicine.interval.minute == 0) ? 'часов' : `: ${medicine.interval.minute}`} ` + 
                  'до ' +
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
                : `Спустя ${medicine.interval.hour}:${medicine.interval.minute} ` +
                  'после ' +
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
        <li>
          Курс лечения:{' '}
          <p>
            {medicine?.duration.index + ' '}
            {medicine?.duration.title == 'days'
              ? 'дня/дней/день'
              : medicine?.duration.title == 'weeks'
              ? 'недели/ей'
              : medicine?.duration.title == 'months'
              ? 'месяц/месяцев'
              : 'год'}
          </p>
        </li>
      </ul>
      <MyButton>Изменить</MyButton>
    </WrapperMyModal>
  );
};

export default MyPopup;
