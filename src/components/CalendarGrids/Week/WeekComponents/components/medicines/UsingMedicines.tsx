//! приём лекарств
import { Moment } from 'moment';
import { FC } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import DependingEating from './medComponents/DependingEating';
import DependingBreakfast from './medComponents/DependingBreakfast';
import DependingSupper from './medComponents/DependingSupper';
import InDependently from './medComponents/InDependently';
import { useAppDispatch } from '../../../../../../store/hooks';
import { readingPopupData } from '../../../../../../store/features/popupDataSlice';
import MyPopup from '../../../../../myPopup/MyPopup';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: ITakingMedication;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med }) => {
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
    const line = document.querySelector('#popup');
    // span
    const span = event.target;
    console.log(span)
    if (event.type == 'mouseover') {
      // если мышь наведена на элемент
      // меняем данные
      dispatch(readingPopupData(med.id)); // передаю только id лекарства, в popup буду find()
      line!.style.cssText = `
      top: ${top - 250}px;
      left: ${left}px;
      display: block;
      transition: "1s ease-in" `;
      // translate3d(${left}px, ${top}px, 0px)
      // стили самого span
      span!.classList.add('span_active');
    } else {
      // если мышь ушла с элемента (mouseout)
      line!.style.cssText = `
      display: none;
      transition: "1s ease-out" `;
      // стили самого span
      // span!.style.color = "gray";
    }
  };

  if (med.depending) {
    //==================================== есть ли зависимости от завтрака/ужина/еды/
    //* если есть, то какая (еда, завтрак, ужин)?
    switch (med.action.type) {
      // ---------------------------------
      case 'eating': // =====================================от еды
        //* до, вовремя или после
        return (
          <div
            //! события наведения и уходы мыши
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'pointer', width: '100%'}}
          >
            <DependingEating
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
        break;

      // ---------------------------------
      case 'first breakfast': //============================= от первого завтрака
        return (
          <div
            //! события наведения и уходы мыши
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <DependingBreakfast
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              firstMealWeekdays={firstMealWeekdays}
              firstMealWeekend={firstMealWeekend}
              med={med}
            />
          </div>
        );

        break;
      // ---------------------------------
      case 'last supper': //================================= от последнего ужина
        return (
          <div
            //! события наведения и уходы мыши
            onMouseOver={hoverMouseOnMedicine}
            onMouseOut={hoverMouseOnMedicine}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <DependingSupper
              dayItem={dayItem}
              halfHourItem={halfHourItem}
              lastMealWeekdays={lastMealWeekdays}
              lastMealWeekend={lastMealWeekend}
              med={med}
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
        //! события наведения и уходы мыши
        onMouseOver={hoverMouseOnMedicine}
        onMouseOut={hoverMouseOnMedicine}
        style={{ cursor: 'pointer', width: '100%' }}
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
