import { FC, memo } from 'react';
import { CounterWrapper } from './stylesMonthGrid/sc_MonthGrid';
import { useAppDispatch } from '../../../store/hooks';
import { readingPopupData } from '../../../store/features/popupDataSlice';
import { Moment } from 'moment';
// БД
import { IRecipesMedications } from '../../../data/localDataBase/LocalDB_WaysUsing';
import MyPopupList from './MyPopupList';

interface IProps {
  index: number;
  count: number;
  dayItem: Moment;
  recipesMedications: IRecipesMedications;
}

const CounterMonth: FC<IProps> = memo(
  ({ index, count, dayItem, recipesMedications }) => {
    // обращение к БД, чтобы взять полный списко ЛС относящийся к одному дню (ячейке)
    //! Для Popup - окна (появляется при наведение на конкертный приём ЛС)
    //Redux-toolkit - из hooks.tsx - для изменения данных
    const hoverMouseOnMedicine = (
      event: React.MouseEvent<HTMLElement>,
    ): void => {
      //* положение Popup относительно элемента (текст лекарства) на который навели курсор
      const box = event.currentTarget.getBoundingClientRect(); // возращает объект, exmple: DOMRect {x: 865.453125, y: 665, width: 89.90625, height: 21, top: 665, …}
      // подробнее: https://learn.javascript.ru/coordinates#getCoords
      // console.log(box)
      // popup
      const line = document.querySelector('#MyPopupList');
      // span
      if (event.type == 'mouseover') {
        // закроем MyPopup.tsx чтобы не перекрывал MyPopupList.tsx
        document.querySelector('#IdPopup')!.style.cssText = `display: none;`
        line!.style.cssText += `
          display: flex;
          top: ${box.top + window.scrollY - 230}px;
          left: ${
            box.left +
            window.scrollX +
            (dayItem.day() === 6 || dayItem.day() == 0 ? -300 : 20)
          }px; 
          animation: show 1s forwards;`; // сама анимация "show" описана myPopup -> sc_MyPopup.tsx/ в воскрсенье Popup left: 100px
      } else if (event.type == 'mouseout') {
        // если мышь ушла с элемента (mouseout)
        line!.style.cssText += `
              animation: hidden 3s forwards;`; // сама анимация "hidden" описана myPopup -> sc_MyPopup.tsx
      }
    };

    return (
      <>
        <CounterWrapper
          key={index}
          onMouseOver={hoverMouseOnMedicine}
          onMouseOut={hoverMouseOnMedicine}
        >
          {/* счетчик */}
          {count !== 0 && `x${count}`}
        </CounterWrapper>
        <MyPopupList recipesMedications={recipesMedications} dayItem={dayItem} />
        
      </>
    );
  },
);

export default CounterMonth;
