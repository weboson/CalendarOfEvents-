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
import { MemoWeekGrid } from '../components/CalendarGrids/Week/WeekGrid';
import DayGrid from '../components/CalendarGrids/Day/DayGrid';

// sc-style
const ShadowWrapper = styled('div')`
  height: 600px; // если просто height: 100% - то header поднимается только при видимом окне
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

  //  For dinamic (update) time (чтобы не нужно было обновлять каждый раз, когда время изменилось и обновлялись компоненты)
  useEffect(() => {
    const timer = setInterval(() => {
      setToday(moment());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // auto scroll "week" for id=#autoScroll: grid hours
  // если данный код установить прямо в GridDayWithHours.tsx - то автоскролл каждый раз при переключении на Week
  // в GridDayWithHours.tsx есть элемент с
  useEffect(() => {
    setTimeout(
      () =>
        // автосролл
        document
          .querySelector('#autoScroll')! //Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
          .scrollIntoView({
            // https://learn.javascript.ru/size-and-scroll-window#scrollintoview
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          }),

      1200,
    );
  }, []);

  const prevHandler = () => setToday((prev) => prev.clone().subtract(1, mode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday((prev) => prev.clone().add(1, mode));
  
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
          <DayGrid currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Week' ? (
          <MemoWeekGrid currentDate={currentDate} />
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
