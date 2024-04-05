import { Moment } from 'moment';
import { FC, memo } from 'react';
// type fo med
import { IRecipesMedication } from '../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';

interface IMedicines {
  currentDate: Moment;
  med: IRecipesMedication;
  sum: string | number;
}

const MedicinesMonth: FC<IMedicines> = memo(({ currentDate, med, sum }) => {
  sum;
  return (
    <div style={{ cursor: 'help', display: 'inline'}}>
        <RiMedicineBottleLine className={`medElemUnic${med.id}`}/>
    </div>
      
  );
});

export default MedicinesMonth;
