import { Moment } from 'moment';
import { FC, memo } from 'react';
// type fo med
import { IRecipesMedication } from '../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../store/hooks';
import { readingPopupData } from '../../../store/features/popupDataSlice';
import { WrapperIcon } from './stylesMonthGrid/sc_MonthGrid';

interface IMedicines {
  currentDate: Moment;
  med: IRecipesMedication;
  sum: string | number;
}

const MedicinesMonth: FC<IMedicines> = memo(({ currentDate, med, sum }) => {
    
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
      top: ${top - 200}px;
      left: ${left - 0}px;
      display: flex;
      animation: show 1s forwards;`;
      } else {
        // если мышь ушла с элемента (mouseout)
        line!.style.cssText += `
      display: none;`;
      }
    };

  return (
    <WrapperIcon 
        onMouseOver={hoverMouseOnMedicine}
        onMouseOut={hoverMouseOnMedicine}>
            <RiMedicineBottleLine className={`medElemUnic${med.id}`}/>
    </WrapperIcon>
      
  );
});

export default MedicinesMonth;
