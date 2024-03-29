import { FC, memo, useEffect, useMemo } from 'react';
import {
  GridWrapper,
  DaySidePanel,
  WrapperSidePanel,
  HourSidePanel,
  WrapperTopPanelAndContent,
  DayOfWeek,
  WrapperColumn,
} from './stylesWeekGrid/sc_WeekGrid';
import moment, { Moment } from 'moment';
import { MemoGridDaysHours } from './WeekComponents/GridDayWithHours';
import MyPopup from '../../myPopup/MyPopup';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { readingMarkerWarning } from '../../../store/features/markerWarningSlice';
import { arrWarningCleare } from '../../../store/features/arrWarningSlice';

interface IProps {
  currentDate: Moment;
}

const WeekGrid: FC<IProps> = ({ currentDate }) => {
  // currentDate - это текущее время, которое автоматически обновляется (useEffect в Home.tsx) каждую минуту (60000 ms)
  // console.log('WeekGrid');

  // Days of week (top panel)
  const ArrayDays = useMemo(
    () =>
      // useMemo, чтобы расчет проводился один раз, остальное из памяти кеша
      [...new Array(7)].map(
        (_, i) => currentDate.clone().startOf('week').add(i, 'day'), //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
      ),
    [currentDate],
  );

  // 24 Hours (side panel) HourSidePanel
  // Days of week (top panel)
  const ArrayHoursSidePanel = useMemo(
    () => [...new Array(24)].map((_, i) => currentDate.hours(i)),
    [currentDate],
  );


  // Memorization/Recovery Scroll position (сохраняет текущий скролл (в mode: Week), даже после перехода на другие компоненты - не нужно постоянно мотать до того места, где остановился)
  // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  useEffect(() => {
    //1 после события скроллинга пользователя - срабатывает сохраннение в sessionStorage(localStorage сохраняет даже после перезагрузки - нам это не нужно, на только после обновления)
    document
      .querySelector('#saveScroll')!
      .addEventListener('scroll', function () {
        const currentScroll = document
          .querySelector('#saveScroll')!
          .scrollTop.toString(); // получили текущий сролл (to String)
        sessionStorage.setItem('position', currentScroll); // сохранили в Storage
      });

    //2  получаем значение свойств scrollTop и используем его, чтобы скроллить на эту позицию
    // console.log(sessionStorage.getItem('position'))
    document
      .querySelector('#saveScroll')!
      .scrollTo(0, +sessionStorage.getItem('position')!); // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  }, []);

  //! WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
  // вызывается в DependingEating.tsx, DependingBreakfast и т.д, а использую в HelperWarningMarker.tsx;
  const dispatch = useAppDispatch();
  const arrWarning = useAppSelector((state) => state.arrWarning);
  useEffect(() => {
    if (arrWarning.arr.indexOf(true) != -1) {
      dispatch(readingMarkerWarning(true)); // [false,fasle,true]
      dispatch(arrWarningCleare()); // очищаем массив
      return;
    } else if (arrWarning.arr.indexOf(false) != -1) {
      dispatch(readingMarkerWarning(false)); // [false,fasle,fasle]
      dispatch(arrWarningCleare()); // очищаем массив
    }
    // console.log(arrWarning)
  }); // если в useEffect - нет зависимостей, то рендеринг будет при любом изменении компонента,
  // а именно каждые 60 сек - из-за currentDate

  return (
    <GridWrapper id="saveScroll">
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Title: "Day" */}
        <DaySidePanel>Day</DaySidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <HourSidePanel
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00 A')}
            {/* {HourSideItem.hour(index).format('LTS')} */}
          </HourSidePanel>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}

      <WrapperTopPanelAndContent>
        {ArrayDays.map((dayItem, index) => (
          <WrapperColumn
            key={index + 1}
            $currentDay={dayItem.isSame(moment(), 'day')}
          >
            <DayOfWeek
              key={index + 2}
              $currentDay={dayItem.isSame(moment(), 'day')}
            >
              {dayItem.format('dddd, D')}
            </DayOfWeek>

            {/* Grid Day with Hours (Content) */}
            <MemoGridDaysHours
              currentDate={currentDate}
              dayItem={dayItem}
            />
          </WrapperColumn>
        ))}
        {/* При наведении на лекарсвто - появляется Popup-окно с подробным описанием ЛС */}
        {/* Обработчик в UsingMedicines.tsx */}
        <MyPopup />
      </WrapperTopPanelAndContent>
    </GridWrapper>
  );
};

// export default WeekGrid;
export const MemoWeekGrid = memo(WeekGrid); // memo, чтобы один раз столбик расчитался, а потом уже 6 раз из памяти рендерился
