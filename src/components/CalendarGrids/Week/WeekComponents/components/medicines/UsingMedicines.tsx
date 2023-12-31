import { Moment } from 'moment';
import { FC } from 'react';
// данные: инфа оприёме ЛС
import takingMedications from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
// данные режима дня
import dietRegimes from '../../../../../../data/localDataBase/localDB_Diets'
import dailyRegimes from '../../../../../../data/localDataBase/localDB_DailyRegime';
import moment from 'moment';
// иконка 
import { RiMedicineBottleLine } from "react-icons/ri";

// Logic

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
}

const UsingMedicines: FC<IProps> = ({ dayItem, halfHourItem }) => {



  
// выберем экземляр массива, где вся инфа:
const med = takingMedications[0]
// Возьмем 1 режим дня[0] база данных: src\data\localDataBase\localDB_DailyRegime.ts
// const regimeInervalWeekDays = dailyRegimes[0].modeRegime.weekdays.endDay - dailyRegimes[0].modeRegime.weekdays.startDay; // режим дня
// const regimeInervalWeekDays = moment().hour(20 - 1).minute(0).diff(moment().hour(8 - 1).minute(30), 'hour'); // режим дня

// начало дня (или первый приём еды)
const startingDay = dailyRegimes[0].modeRegime.weekdays.startDay.clone() // обз clone() иначе изменим исходник

// получили end(ужин) - start(завтрак) = время бодровствования 14 часов (в будни)
const regimeInervalWeekDays = dailyRegimes[0].modeRegime.weekdays.endDay.diff(dailyRegimes[0].modeRegime.weekdays.startDay, 'hour'); // режим дня
const intervalUsing = Math.floor(regimeInervalWeekDays / med.quantity) // окрулить вниз(время бодровствоания / количесвто приёма ЛС) 
// console.log(intervalUsing)




  return (
    <>

        {
          // есть ли зависимость от еды?
         (med.isRegardlessOfFood) ? ((
          halfHourItem.isSame(startingDay.add(med.interval, 'm'), 'hour')) &&  
          (halfHourItem.minute()  >= startingDay.add(med.interval, 'm').minute() && halfHourItem.minute() != 0
         ) && 
         <RiMedicineBottleLine style={{color: 'red'}}/>) : null
        }
 
    </>
  );
};

export default UsingMedicines;
