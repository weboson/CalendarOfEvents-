//! приём лекарств
import { Moment } from 'moment';
import { FC } from 'react';
// данные графика питания: first and last eating
// import mealSchedule from '../../../../../../data/localDataBase/localDB_MealSchedule';
// иконка
import { RiMedicineBottleLine } from 'react-icons/ri';
import { ITakingMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import {DependingEating} from './medComponents/DependingEating';
import moment from 'moment';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  med: ITakingMedication;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem, med }) => {

  //! вот этот передаём через пропсы
  const firstMealWeekdays = moment().hour(8).minute(0);
  const lastMealWeekdays = moment().hour(22).minute(0);


  const diffIntervalMealWeekdays = lastMealWeekdays.diff(
    firstMealWeekdays,
    'seconds',
  );
  const betweenMealsWeekdays = diffIntervalMealWeekdays / (med!.quantity - 1); 
  const firstMealWeekend = moment().hour(8).minute(0); // обз clone() иначе изменим исходник
  const lastMealWeekend = moment().hour(20).minute(0); 

  const diffIntervalMealWeekend = lastMealWeekend.diff(
    firstMealWeekend,
    'seconds',
  );
  const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);

  // ! создать отдельный файл (либо в беке либо во фронте) и передавать объектом

  return <DependingEating
      firstMealWeekdays={firstMealWeekdays}
      firstMealWeekend={firstMealWeekend}
      med={med}
      dayItem={dayItem}
      halfHourItem={halfHourItem}
      betweenMealsWeekdays={betweenMealsWeekdays}
      betweenMealsWeekend={betweenMealsWeekend}
    />
};

export default UsingMedicines;
