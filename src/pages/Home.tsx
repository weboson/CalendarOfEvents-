import { FC, useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { currentMoment } from '../data/currentMoment';
import YearGrid from '../components/CalendarGrids/Year/YearGrid';
import MonthGrid from '../components/CalendarGrids/Month/MonthGrid';
import { menuModesDate } from '../data/dataMenu';
import { modesMonitor } from '../data/modesMonitor'; // МАССИВ режимов отображения в Monitor
import { useAppSelector } from '../store/hooks';
import  WeekGrid from '../components/CalendarGrids/Week/WeekGrid';
import Day from '../components/CalendarGrids/Day/Day';

// sc-style
const ShadowWrapper = styled('div')`
  width: 100%;
  /* border: 1px solid #464648; // иначе появляется белая полоса слева при  скролле вниз */
  /* overflow: hidden; */
  /* box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888; // тень */
`;

const Home: FC = () => {
  // redux-toolkit
  const index = useAppSelector((state) => state.menu);

  const mode = modesMonitor[index].title; // 'month' (режим отображения заголовка в Monitor: Month)

  const [currentDate, setToday] = useState<Moment>(currentMoment || ''); // currentDate в currentDate.ts

  const firstDayOfWeek = currentDate.clone().startOf('month').startOf('week'); // стартовый день: 01.понедельник.2023

  const prevHandler = () => setToday((prev) => prev.clone().subtract(1, mode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday((next) => next.clone().add(1, mode));

  //  For dinamic (update) time (чтобы не нужно было обновлять каждый раз, когда время изменилось и обновлялись компоненты)
  useEffect(() => {
    const timer = setInterval(() => {
      // если currentDate !не равна текущему времени, значит изменить его в текущее время
      !(currentDate.isSame(moment())) && setToday(moment()) 
      // шаблон для установки времени: moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss");
      //- setToday(moment('30.04.2024', 'DD.MM.YYYY')) 
      //  или setToday(moment('7:00', 'hh:mm')) - время почему-то не устанавливается
      // - для проверки зависимсоти от установленного нами текущей даты
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }); // без массива зависимости, чтобы currentDate постоянно обновлялся (был актулаьных), он запоминается в setInterval
  
  // выбранный режим меню (day, week, month, year)
  const indexMenu = useAppSelector((state) => state.menu); // из Readux-toolkit
  // console.log(renderMeds)
  return (
    <ShadowWrapper>
      <Header />
      <Monitor
        currentDate={currentDate}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />

      {
        // mode menu: Day, Week, Month, Year
        menuModesDate[indexMenu].title == 'Day' ? (
          <Day currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Week' ? (
          <WeekGrid currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Month' ? (
          <MonthGrid
            firstDayOfWeek={firstDayOfWeek}
            currentDate={currentDate || null}
          />
        ) : (
          <YearGrid currentDate={currentDate} />
        )
      }
    </ShadowWrapper>
  );
};

export default Home;
