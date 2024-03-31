//! приём лекарств
import { Moment } from 'moment';
import { FC, memo, useMemo } from 'react';
// данные графика питания: first and last eating
import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
import { IRecipesMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { DependingEatingMemo } from './medComponents/DependingEating';
import { DependingBreakfastMemo } from './medComponents/DependingBreakfast';
import { DependingSupperMemo } from './medComponents/DependingSupper';
import { InDependentlyMemo } from './medComponents/InDependently';
import { useAppDispatch } from '../../../../../../store/hooks';
import { readingPopupData } from '../../../../../../store/features/popupDataSlice';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: IRecipesMedication;
  currentDayForWirning: boolean;
  currentDate: Moment;
}

const UsingMedicines: FC<IProps> = ({
  dayItem,
  halfHourItem,
  med,
  currentDayForWirning,
  currentDate,
}) => {
  
  // weekday: интервал между первым и последней едой
  const firstMealWeekdays = useMemo(() => (
    currentDate
    .set({
      hour: mealSchedule[0].modeRegime.weekdays.firstMeal.hour,
      minute: mealSchedule[0].modeRegime.weekdays.firstMeal.minute,
    })
    .clone() // обз clone() иначе изменим исходник
  ), [currentDate])

  const lastMealWeekdays = useMemo(() => (
    currentDate
    .set({
      hour: mealSchedule[0].modeRegime.weekdays.lastMeal.hour,
      minute: mealSchedule[0].modeRegime.weekdays.lastMeal.minute,
    })
    .clone()
  ), [currentDate]) 

  const diffIntervalMealWeekdays = useMemo(
    () => lastMealWeekdays.diff(firstMealWeekdays, 'seconds'),
    [firstMealWeekdays, lastMealWeekdays],
  );

  const betweenMealsWeekdays = useMemo(
    () => diffIntervalMealWeekdays / (med.quantity - 1),
    [diffIntervalMealWeekdays, med.quantity],
  );

  // weekend: интервал между первым и последней едой
  const firstMealWeekend = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule[0].modeRegime.weekend.firstMeal.hour,
          minute: mealSchedule[0].modeRegime.weekend.firstMeal.minute,
        })
        .clone(),
    [currentDate],
  ); // обз clone() иначе изменим исходник
  
  const lastMealWeekend = useMemo(
    () =>
      currentDate
        .set({
          hour: mealSchedule[0].modeRegime.weekend.lastMeal.hour,
          minute: mealSchedule[0].modeRegime.weekend.lastMeal.minute,
        })
        .clone(),
    [currentDate],
  );

  const diffIntervalMealWeekend = useMemo(() => (lastMealWeekend.diff(
    firstMealWeekend,
    'seconds',
  )), [lastMealWeekend, firstMealWeekend])
  const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);

  //! Для Popup - окна (появляется при наведение на конкертный приём ЛС)
  //Redux-toolkit - из hooks.tsx - для изменения данных
  const dispatch = useAppDispatch();
  // Обработчик onMouseOver и onMouseOut: при наведении мышью на ячейку с ЛС, появляется Popup - окно с подробным списком лекарств
  // (еще в самом myPopup.tsx есть событие - чтобы popup не исчезал при наведение на самого popup)
  const hoverMouseOnMedicine = (event: React.MouseEvent) => {
    // тип атриубта https://habr.com/ru/articles/783858/
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
      top: ${top - 350}px;
      left: ${left - 10}px;
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
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DependingEatingMemo
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
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DependingBreakfastMemo
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
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DependingSupperMemo
                dayItem={dayItem}
                halfHourItem={halfHourItem}
                lastMealWeekdays={lastMealWeekdays}
                lastMealWeekend={lastMealWeekend}
                med={med}
                currentDayForWirning={currentDayForWirning}
                currentDate={currentDate}
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
          style={{ cursor: 'help', maxWidth: 'fit-content' }}
        >
          <InDependentlyMemo
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
    }
  };

// export default UsingMedicines;
export const UsingMedicinesMemo = memo(UsingMedicines); // memo, возможно быстрее будет загружатся лекарства в ячейке
