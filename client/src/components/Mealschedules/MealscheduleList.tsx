import { FC } from 'react';
import { ListWrappeer } from './sc_Mealschedule';
import { mealSchedule } from '../../data/localDataBase/localDB_MealSchedule';

const MealscheduleList: FC = () => {
  return (
    <ListWrappeer>
      <h1>Список Ваших графиков приёма пищи:</h1>
      <ul>
        <li>
          <h2>В будни:</h2>

          {mealSchedule ? (
            <>
              <p>Первый приём пищи в: {mealSchedule.weekday[0]}:00 часов</p>
              <p>Последний приём пищи в: {mealSchedule.weekday[1]}:00 часов</p>
            </>
          ) : (
            'У Вас пока, нет графиков. Создайте их.'
          )}
        </li>
        <li>
          <h2>В выходные:</h2>

          {mealSchedule ? (
            <>
              <p>Первый приём пищи в: {mealSchedule.weekend[0]}:00 часов</p>
              <p>Последний приём пищи в: {mealSchedule.weekend[1]}:00 часов</p>
            </>
          ) : (
            'У Вас пока, нет графиков. Создайте их.'
          )}
        </li>
      </ul>
    </ListWrappeer>
  );
};

export default MealscheduleList;
