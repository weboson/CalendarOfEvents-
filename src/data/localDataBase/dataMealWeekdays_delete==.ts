
import takingMedications from './LocalDB_WaysUsing';
import mealSchedule from './localDB_MealSchedule';
const med = takingMedications[0]

//* weekday
// приёмы пищи:
// 1-й приём пищи
const firstMealWeekdays = mealSchedule[0].modeRegime.weekdays.firstMeal.clone() // обз clone() иначе изменим исходник
// последний приём пищи
const lastMealWeekdays = mealSchedule[0].modeRegime.weekdays.lastMeal.clone()

//* интервал (промежуточные приёмы пищи)
// время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
const diffIntervalMealWeekdays = lastMealWeekdays.diff(firstMealWeekdays, 'hours') // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
//console.log(diffIntervalMealWeekdays) // 50400000
// интервал времени / количество приёма ЛЕкарств                      
// -1 потому что (в начале завтрак -1)
const betweenMealsWeekdays = (diffIntervalMealWeekdays / (med.quantity-1)) // 50400000(~14 ч) / 3-1раз/день = 3.5 часа - 
//console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)
export const dataMealWeekdays = {
    firstMealWeekdays,
    lastMealWeekdays,
    diffIntervalMealWeekdays,
    betweenMealsWeekdays,
}

//* weekend
// тоже самое только weekend
const firstMealWeekend = mealSchedule[0].modeRegime.weekend.firstMeal.clone() // обз clone() иначе изменим исходник
const lastMealWeekend = mealSchedule[0].modeRegime.weekend.lastMeal.clone()

const diffIntervalMealWeekend = lastMealWeekend.diff(firstMealWeekend, 'seconds')
const betweenMealsWeekend = (diffIntervalMealWeekend / (med.quantity-1)) 

export const dataMealWeekend = {
    firstMealWeekend,
    lastMealWeekend,
    diffIntervalMealWeekend,
    betweenMealsWeekend,
}