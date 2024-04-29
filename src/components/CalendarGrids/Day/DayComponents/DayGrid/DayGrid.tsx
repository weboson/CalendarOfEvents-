import { FC, useEffect, useMemo } from 'react';
import {
  WrapperListHalfHours,
  WrapperList,
  WrapperGridDay,
  WrapperSidePanel,
} from '../../stylesDayGrid/sc_DayGrid';
import { Moment } from 'moment';
import moment from 'moment';
import ListDayHalfHours from './ListDayHalfHours';
import recipesMedications from '../../../../../data/localDataBase/LocalDB_WaysUsing';
import { arrayColors } from '../../../../../data/colors';

interface IProps {
  currentDate: Moment;
}

const DayGrid: FC<IProps> = ({ currentDate }) => {
  // 24 Hours (side panel) HourSidePanel
  // Days of week (top panel)
  const ArrayHoursSidePanel = useMemo(
    () => [...new Array(24)].map((_, i) => currentDate.hours(i)),
    [currentDate],
  );

    //! цветные лекарства:
 // массив цветов (arrayColors) генерируется в Colors.ts - в отдельном файле, т.к. генерируется 1 раз (для решения бага: если ЛС исчезнет, и если он снова появится, то уже без цвета )
  // назначение стилей
  useEffect(() => {
    recipesMedications.map((itemMed, index) => {
      // const color = getRandomColor();
      for (const elem of document.querySelectorAll(
        `.medElemUnic${itemMed.id}`, // пример классов: medElemUnic6, medElemUnic7, medElemUnic12 etc - (таким же методом назанченные в InDependently.tsx и тд.)
      )) {
        elem.style.cssText += 
        `background-color: ${arrayColors[index] || 'white'};
          padding: 0 8px`;
      }
    });
  }); 
  // если без массива зависимостей, то будет при каждом измененеии менятся цвет.
  // С currenDate также будет себя вести, как без массива,
  // если пустой массива, то при 1-й загрузке

  return (
    <WrapperGridDay id="saveScrollDay">
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <WrapperListHalfHours
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00 A')}
          </WrapperListHalfHours>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}
      <WrapperList>
        {/* Grid Day with Hours (Content) */}
        <ListDayHalfHours currentDate={currentDate} />
      </WrapperList>
    </WrapperGridDay>
  );
};

export default DayGrid;
