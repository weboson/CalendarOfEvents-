//! Icons: Moon и Sun
// Установка промежуток - между первым и поcледним приёмом пищи полученных с БД - далее установка в них иконок
// Пример данных: {id: 127, weekday: [7,21], weekend: [9:23], createDateMeal: '2024-08-20T01:44:11.291Z', updateDateMeal: '2024-08-20T01:44:11.291Z', …}
import { FC, useEffect, useMemo, useState } from 'react';
import {
  WrapperListHalfHours,
  WrapperList,
  WrapperGridDay,
  WrapperSidePanel,
} from '../../stylesDayGrid/sc_DayGrid';
import { Moment } from 'moment';
import moment from 'moment';
import ListDayHalfHours from './ListDayHalfHours';
import recipesMedications from '../../../../../data/localDataBase/LocalDB_WaysUsing';
import { arrayColors } from '../../../../../data/colors';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { readingMarkerWarning } from '../../../../../store/features/markerWarningSlice';
import { arrWarningCleare } from '../../../../../store/features/arrWarningSlice';
import { MealScheduleService } from '../../../../../services/mealschedule.service';
import { toast } from 'react-toastify';
import { IMealscheduleRepository } from '../../../../../types/types';

interface IMeal {
  firstMealWeekdays: Moment;
  lastMealWeekdays: Moment;
  firstMealWeekend: Moment;
  lastMealWeekend: Moment;
}

interface IProps {
  currentDate: Moment;
}

const DayGrid: FC<IProps> = ({ currentDate }) => {
  // 24 Hours (side panel) HourSidePanel
  // Days of week (top panel)
  const ArrayHoursSidePanel = useMemo(
    () => [...new Array(24)].map((_, i) => currentDate.hours(i)),
    [currentDate],
  );

  //! WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
  // вызывается в DependingEating.tsx, DependingBreakfast и т.д, а использую в HelperWarningMarker.tsx;
  const dispatch = useAppDispatch();
  const arrWarning = useAppSelector((state) => state.arrWarning);
  useEffect(() => {
    if (arrWarning.arr.indexOf(true) != -1) {
      // arr.indexOf(item, from) ищет item начиная с индекса from и возвращает номер индекса, на котором был найден искомый элемент, в противном случае -1.
      dispatch(readingMarkerWarning(true)); // [false,fasle,true]
      dispatch(arrWarningCleare()); // очищаем массив
      return;
    } else if (arrWarning.arr.indexOf(false) != -1) {
      dispatch(readingMarkerWarning(false)); // [false,fasle,fasle]
      dispatch(arrWarningCleare()); // очищаем массив
    }
  }); // если в useEffect - нет зависимостей, то рендеринг будет при любом изменении компонента,
  // а именно каждые 60 сек - из-за currentDate

  //! цветные лекарства:
  // массив цветов (arrayColors) генерируется в Colors.ts - в отдельном файле, т.к. генерируется 1 раз (для решения бага: если ЛС исчезнет, и если он снова появится, то уже без цвета )
  // назначение стилей
  useEffect(() => {
    recipesMedications.map((itemMed, index) => {
      // const color = getRandomColor();
      for (const elem of document.querySelectorAll(
        `.medElemUnic${itemMed.id}`, // пример классов: medElemUnic6, medElemUnic7, medElemUnic12 etc - (таким же методом назанченные в InDependently.tsx и тд.)
      )) {
        elem.style.cssText += `background-color: ${
          arrayColors[index] || 'white'
        };
          padding: 0 8px`;
      }
    });
  });
  // если без массива зависимостей, то будет при каждом изменении менятся цвет.
  // С currenDate также будет себя вести, как без массива,
  // если пустой массива, то при 1-й загрузке

  // состояние данных
  const [spaceBetweenMeals, setSpaceBetweenMeals] = useState<IMeal | Object>(
    {},
  );
  //! метод для преоброзования данных с сервера в первый / псоледний приём пищи на weekday и weekend
  const getSpaceBetweenMeals = (data: IMealscheduleRepository) => {
    if (data.id) {
      // console.log('прошло');
      const firstMealWeekdays = currentDate
        .set({
          hour: +data.weekday[0],
        })
        .clone();

      const lastMealWeekdays = currentDate
        .set({
          hour: +data.weekday[1],
        })
        .clone();
      //weekend
      const firstMealWeekend = currentDate
        .set({
          hour: +data.weekend[0],
        })
        .clone();

      const lastMealWeekend = currentDate
        .set({
          hour: +data.weekend[1],
        })
        .clone();

      //! установим в state новые данные
      setSpaceBetweenMeals({
        firstMealWeekdays,
        lastMealWeekdays,
        firstMealWeekend,
        lastMealWeekend,
      });
    } else {
      toast.error('setSpaceBetweenMeals');
    }
  };

  //! получим созданную в форме id графика (в MealscheduleForm.tsx и изменненую в ReduxTK)
  const idMeal = '' + localStorage.getItem('idMealschedules');
  // console.log(idMeal);
  // получаем данные с сервера
  const getMealSchedule = async (id: string) => {
    try {
      const response = await MealScheduleService.getOne(id);
      if (response) {
        console.log(response)
        //* устанавливаем полученные с БД данные в: первые и последние питания на weekday/weekend
        getSpaceBetweenMeals(response);
        toast.success('График питания - получен удачно');
        return response;
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      console.log(error?.toString()); // для отладки
      toast.error('Создайте график питания');
    }
  };

  useEffect(() => {
    getMealSchedule(idMeal);
  }, [currentDate]);

  return (
    <WrapperGridDay id="saveScrollDay">
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <WrapperListHalfHours
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00')}
          </WrapperListHalfHours>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}
      <WrapperList>
        {/* Grid Day with Hours (Content) */}
        <ListDayHalfHours currentDate={currentDate} meal={spaceBetweenMeals} />
      </WrapperList>
    </WrapperGridDay>
  );
};

export default DayGrid;
