//! Окно рецепта для Day - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
// DataBase array
import takingMedications from '../../../../../data/localDataBase/LocalDB_WaysUsing';
import {
  MyButton,
  WrapperMyButton,
  WrapperRecipe,
  WrapperRecipeWindow,
} from '../../stylesDayGrid/sc_DayGrid';

const RecipeWindow: FC = () => {
  //Redux-toolkit - из hooks.tsx -
  // получили id лекарства
  const idMed = useAppSelector((state) => state.chosenMedicine); // изменение состояния (useAppDispatch) в DayUsingMedicines.tsx
  // нашли сам объект лекарства по его id
  const medicine = takingMedications.find((item) => item.id == idMed);

  return (
    <WrapperRecipeWindow>
      {/* сторая обертка, чтобы позиционировать элментами не выхоодя за белый фон */}
      <WrapperRecipe>
        <h2>Схема приема препарата: </h2>
        {/* при обновлении, лекарство не вырбано, если так то сообщение о клике на ЛС */}
        {(medicine) ? (
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
                          ? `За ${medicine.interval.hour} ${
                              medicine.interval.minute == 0
                                ? 'часов'
                                : `: ${medicine.interval.minute}`
                            } ` +
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
        ) : (<p style={{fontSize: '3em'}}>Чтобы узнать подробности <br/> - кликните мышкой по любому лекарству</p>)}
      </WrapperRecipe>
      <WrapperMyButton>
          {(medicine) && (<MyButton>Изменить</MyButton>)}
        </WrapperMyButton>
    </WrapperRecipeWindow>
  );
};

export default RecipeWindow;
