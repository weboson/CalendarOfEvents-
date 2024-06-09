//! Режим питания:  Маркировка (icon food) моментов приёма пищи в таблице времени и днеq недели (weekday, weekend)
//! 2 вида: в будни и выходные (также как и режимы дня (Moon, Sun))
import { FC, memo, useMemo } from 'react';
import { IRecipesMedication } from '../../../../../data/localDataBase/LocalDB_WaysUsing';
import { MdOutlineFastfood } from 'react-icons/md';
import { Moment } from 'moment';
import { FoodTooltip, StyleIconFood } from '../../stylesWeekGrid/sc_WeekGrid';
import mealSchedule from '../../../../../data/localDataBase/localDB_MealSchedule';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  maxmealfood: IRecipesMedication;
  currentDate: Moment;
}

const MealSchedule: FC<IProps> = memo(({
  halfHourItem,
  dayItem,
  currentDate,
  maxmealfood,
}) => {
  // приёмы пищи (для дочерних компонентов):
  // входящий тип данных {hour: 8, minute: 0}
  // установка времени относительно динамичному currentDate,
  // exem: moment().set({'year': 2024, 'month': 3, 'date': 1})
  //* weekday
  // 1-й приём пищи.
  const firstMealWeekdays = 
    currentDate
    .set({
      hour: mealSchedule[0].modeRegime.weekdays.firstMeal.hour,
      minute: mealSchedule[0].modeRegime.weekdays.firstMeal.minute,
    })
    .clone() // обз clone() иначе изменим исходник
  

  // последний приём пищи
  const lastMealWeekdays = 
    currentDate
    .set({
      hour: mealSchedule[0].modeRegime.weekdays.lastMeal.hour,
      minute: mealSchedule[0].modeRegime.weekdays.lastMeal.minute,
    })
    .clone();

  //* интервал (промежуточные приёмы пищи): diff - это разница в moment
  // время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
  const diffIntervalMealWeekdays = useMemo(
    () => lastMealWeekdays.diff(firstMealWeekdays, 'seconds'),
    [lastMealWeekdays, firstMealWeekdays],
  ); // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
  //console.log(diffIntervalMealWeekdays) // 50400000
  // интервал времени / количество приёма Лекарств
  // -1 потому что (в начале завтрак -1)
  const betweenMealsWeekdays = useMemo(
    () => Math.floor(diffIntervalMealWeekdays / (maxmealfood.quantity - 1)),
    [diffIntervalMealWeekdays, maxmealfood],
  ); // 50400000(~14 ч) / 3-1раз/день = 3.5 часа -
  //console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)

  //* weekend
  // тоже самое только weekend
  const firstMealWeekend = 
      currentDate
        .set({
          hour: mealSchedule[0].modeRegime.weekend.firstMeal.hour,
          minute: mealSchedule[0].modeRegime.weekend.firstMeal.minute,
        })
        .clone();

  const lastMealWeekend = 
      currentDate
        .set({
          hour: mealSchedule[0].modeRegime.weekend.lastMeal.hour,
          minute: mealSchedule[0].modeRegime.weekend.lastMeal.minute,
        })
        .clone();

  const diffIntervalMealWeekend = useMemo(
    () => lastMealWeekend.diff(firstMealWeekend, 'seconds'),
    [lastMealWeekend, firstMealWeekend],
  );
  const betweenMealsWeekend = useMemo(
    () => Math.floor(diffIntervalMealWeekend / (maxmealfood.quantity - 1)),
    [diffIntervalMealWeekend, maxmealfood],
  );

  if (!maxmealfood.independently) {
    // есть ли зависимость от еды?
    return (
      <>
        {
          // Оптимальный код(где важен порядок и сравнения), иначе при изменении минут в localDB_MealSchedule - могут пропасть приёмы пищи
          //weekday
          dayItem.day() !== 6 && dayItem.day() !== 0
            ? (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
                firstMealWeekdays.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekdays.minute() - halfHourItem.minute() < 30 && (
                  <FoodTooltip data-title="Приём пищи" key={1}>
                    <StyleIconFood>
                    <MdOutlineFastfood />
                    </StyleIconFood>
                  </FoodTooltip>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(maxmealfood.quantity)].map((_, index) =>
                //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
                halfHourItem.isSame(
                  firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                  'hour',
                ) && // схравнение по часу
                firstMealWeekdays
                  .clone()
                  .add(betweenMealsWeekdays, 'm')
                  .minute() -
                  halfHourItem.minute() >=
                  0 &&
                firstMealWeekdays
                  .clone()
                  .add(betweenMealsWeekdays, 'm')
                  .minute() -
                  halfHourItem.minute() <
                  30 ? (
                  <FoodTooltip data-title="Приём пищи" key={index + 2}>
                    <StyleIconFood>
                      <MdOutlineFastfood />
                    </StyleIconFood>
                  </FoodTooltip>
                ) : null,
              )
            : // weekend
              (halfHourItem.isSame(firstMealWeekend, 'hour') &&
                firstMealWeekend.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
                firstMealWeekend.minute() - halfHourItem.minute() < 30 && (
                  <FoodTooltip data-title="Приём пищи" key={22}>
                    <StyleIconFood>
                      <MdOutlineFastfood />
                    </StyleIconFood>
                  </FoodTooltip>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
              [...new Array(maxmealfood.quantity)].map((_, index) =>
                //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
                halfHourItem.isSame(
                  firstMealWeekend.add(betweenMealsWeekend, 's'),
                  'hour',
                ) && // схравнение по часу
                firstMealWeekend
                  .clone()
                  .add(betweenMealsWeekend, 'm')
                  .minute() -
                  halfHourItem.minute() >=
                  0 &&
                firstMealWeekend
                  .clone()
                  .add(betweenMealsWeekend, 'm')
                  .minute() -
                  halfHourItem.minute() <
                  30 ? ( // схравнение по минуте
                  <FoodTooltip data-title="Приём пищи" key={index + 22}>
                    <StyleIconFood>
                      <MdOutlineFastfood />
                    </StyleIconFood>
                  </FoodTooltip>
                ) : null,
              )
        }
      </>
    );
  }
}
);

export default MealSchedule;
