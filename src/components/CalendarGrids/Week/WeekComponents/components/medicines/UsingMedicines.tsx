//! приём лекарств
import { Moment } from 'moment';
import { FC, useEffect } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import DependingEating from './medComponents/DependingEating';
import DependingBreakfast from './medComponents/DependingBreakfast';
import DependingSupper from './medComponents/DependingSupper';
import InDependently from './medComponents/InDependently';
import { useAppDispatch } from '../../../../../../store/hooks';
import { readingPopupData } from '../../../../../../store/features/popupDataSlice';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: ITakingMedication;
  currentDayForWirning: boolean;
  currentDate: Moment;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med, currentDayForWirning,  currentDate}) => {

  // weekday
  const firstMealWeekdays =
    mealSchedule[0].modeRegime.weekdays.firstMeal.clone(); // обз clone() иначе изменим исходник
  const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone();

  const diffIntervalMealWeekdays = lastMealWeekdays.diff(
    firstMealWeekdays,
    'seconds',
  );
  const betweenMealsWeekdays = diffIntervalMealWeekdays / (med.quantity - 1);

  // weekend
  const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone(); // обз clone() иначе изменим исходник
  const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone();
  const diffIntervalMealWeekend = lastMealWeekend.diff(
    firstMealWeekend,
    'seconds',
  );
  const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);

  //! Для Popup - окна
  //Redux-toolkit - из hooks.tsx - для изменения данных
  const dispatch = useAppDispatch(); 
  // Обработчик onMouseOver и onMouseOut: при наведении мышью на ячейку с ЛС, появляется Popup - окно с подробным списком лекарств
  // (еще в самом myPopup.tsx есть событие - чтобы popup не исчезал при наведение на самого popup)
  const hoverMouseOnMedicine = (event: React.MouseEvent) => { // тип атриубта https://habr.com/ru/articles/783858/   
    const top = event.clientY;
    const left = event.clientX;
    // popup
    const line = document.querySelector('#IdPopup');
    // span
    if (event.type == 'mouseover') {
      // если мышь наведена на элемент
      // меняем данные (redux-toolkit)
      dispatch(readingPopupData(med.id)); // передаю только id лекарства, в popup буду find()
      line!.style.cssText += `
      top: ${top-350}px;
      left: ${left-10}px;
      display: flex;
      animation: show 1s forwards;`;
    } else {
      // если мышь ушла с элемента (mouseout)
      line!.style.cssText += `
      display: none;`;
    }
  };

  if (med.depending) {
    //==================================== есть ли зависимости от завтрака/ужина/еды/
    //* если есть, то какая (еда, завтрак, ужин)?
    switch (med.action) {
      // ---------------------------------
      case 'eating': // =====================================от еды
        //* до, вовремя или после
        return (
          <div
            // события наведения и уходы мыши
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'help', maxWidth: "fit-content"}}
          >
            <DependingEating
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              firstMealWeekdays={firstMealWeekdays}
              betweenMealsWeekdays={betweenMealsWeekdays}
              firstMealWeekend={firstMealWeekend}
              betweenMealsWeekend={betweenMealsWeekend}
              med={med}
              currentDayForWirning={currentDayForWirning} 
              currentDate={currentDate}
            />
          </div>
        );
        break;

      // ---------------------------------
      case 'first breakfast': //============================= от первого завтрака
        return (
          <div
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'help', maxWidth: "fit-content"}}
          >
            <DependingBreakfast
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              firstMealWeekdays={firstMealWeekdays}
              firstMealWeekend={firstMealWeekend}
              med={med}
              currentDayForWirning={currentDayForWirning}
              currentDate={currentDate}
            />
          </div>
        );

        break;
      // ---------------------------------
      case 'last supper': //================================= от последнего ужина
        return (
          <div
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'help', maxWidth: "fit-content"}}
          >
            <DependingSupper
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              lastMealWeekdays={lastMealWeekdays}
              lastMealWeekend={lastMealWeekend}
              med={med}
              currentDayForWirning={currentDayForWirning} 
            />
          </div>
        );
        break;

      // ---------------------------------
      default:
        break;
    }
  } else {
    //======================================================= ВНЕ ЗАВИСИМОСТИ ОТ ЕДЫ
    return (
      <div
        onMouseOver={hoverMouseOnMedicine}
        onMouseOut={hoverMouseOnMedicine}
        style={{ cursor: 'help', maxWidth: "fit-content"}}
      >
        <InDependently
          dayItem={dayItem}
          halfHourItem={halfHourItem}
          firstMealWeekdays={firstMealWeekdays}
          betweenMealsWeekdays={betweenMealsWeekdays}
          firstMealWeekend={firstMealWeekend}
          betweenMealsWeekend={betweenMealsWeekend}
          med={med}
        />
      </div>
    );
  }
};

export default UsingMedicines;
