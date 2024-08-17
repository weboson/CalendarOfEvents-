//! Наименования (список) имеющегося у user графика (MealscheduleList)
import { FC, useEffect, useState } from 'react';
import { ListWrappeer } from './sc_Mealschedule';
import { MealScheduleService } from '../../services/mealschedule.service';
import { useAppSelector } from '../../store/hooks';

const MealscheduleList: FC = () => {
  // получим созданную в форме id графика
  const id = localStorage.getItem('idMealschedules');
  // console.log(id)
  // пустые данные
  const [data, setData] = useState({});

  const getMealSchedule = async () => {
    const response = await MealScheduleService.getOne(id);
    // console.log(data);
    setData(response);
    return data;
  };
  useEffect(() => {
    getMealSchedule();
  }, []);

  return (
    <ListWrappeer>
      {data.id ? (
        <div>
          <h1>Список Ваших графиков приёма пищи: {data.id}</h1>
          <ul>
            <li>
              <h2>В будни:</h2>

              {data ? (
                <>
                  <p>Первый приём пищи в: {data.weekday[0]}:00 часов</p>
                  <p>Последний приём пищи в: {data.weekday[1]}:00 часов</p>
                </>
              ) : (
                'У Вас пока, нет графиков. Создайте их.'
              )}
            </li>
            <li>
              <h2>В выходные:</h2>

              {data ? (
                <>
                  <p>Первый приём пищи в: {data.weekend[0]}:00 часов</p>
                  <p>Последний приём пищи в: {data.weekend[1]}:00 часов</p>
                </>
              ) : (
                'У Вас пока, нет графиков. Создайте их.'
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <h1>Создайте свой график питания.</h1>
        </div>
      )}
    </ListWrappeer>
  );
};

export default MealscheduleList;
