import { FC, useState } from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { currentMoment } from '../data/currentDate';
import YearGrid from '../components/CalendarGrids/Year/YearGrid';
import MonthGrid from '../components/CalendarGrids/Month/MonthGrid';
import { menuModesDate } from '../data/dataMenu';
import { modesMonitor } from '../data/modesMonitor'; // МАССИВ режимов отображения в Monitor
import { useAppSelector } from '../store/hooks';


// sc-style
const ShadowWrapper = styled('div')`
  border-radius: 8px;
  border: 1px solid #464648;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

const Home: FC = () => {

  // redux-toolkit
  const index = useAppSelector((state) => state.menu)
  
  const mode = modesMonitor[index].title // 'month' (режим отображения заголовка в Monitor: Month)

  const [currentDate, setToday] = useState<Moment>(currentMoment || ''); // currentDate в currentDate.ts 
  const firstDayOfWeek = currentDate.clone().startOf('month').startOf('week'); // стартовывй день: 01.понедельник.2023

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, mode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, mode));

  // выбранный режим меню (day, week, month, year)
  const indexMenu = useAppSelector((state) => state.menu) // из Readux-toolkit

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
        (menuModesDate[indexMenu].title == 'Day') ? (<div>Day</div>) :
        (menuModesDate[indexMenu].title == 'Week') ? (<div>Week</div>) :
        (menuModesDate[indexMenu].title == 'Month') ? (<MonthGrid firstDayOfWeek={firstDayOfWeek} currentDate={currentDate || null} />) :
        (<YearGrid currentDate={currentDate}/>)
      }  
    </ShadowWrapper>
  );
};


export default Home;
