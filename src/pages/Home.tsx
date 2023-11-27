import { FC, useState } from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import styled from 'styled-components';
import { Moment } from 'moment';
import moment from 'moment';
import { currentDate } from '../data/currentDate';
import YearGrid from '../components/CalendarGrids/Year/YearGrid';
import MonthGrid from '../components/CalendarGrids/Month/MonthGrid';
import { useAppSelector } from '../store/hooks';
import { menuModesDate } from '../data/dataMenu';


// sc-style
const ShadowWrapper = styled('div')`
  border-radius: 8px;
  border: 1px solid #464648;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

const Home: FC = () => {


  const [currentData, setToday] = useState<Moment>(currentDate || ''); // currentDate в currentDate.ts 
  const firstDayOfWeek = currentData.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));


  // выбранный режим меню (day, week, month, year)
  const indexMenu = useAppSelector((state) => state.menu) // из Readux-toolkit
  //console.log(indexMenu)


  return (
    <ShadowWrapper>
      <Header />
      <Monitor 
        currentData={currentData}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
    />

      {
        // mode menu
        (menuModesDate[indexMenu].title == 'Day') ? (<div>Day</div>) :
        (menuModesDate[indexMenu].title == 'Week') ? (<div>Week</div>) :
        (menuModesDate[indexMenu].title == 'Month') ? (<MonthGrid firstDayOfWeek={firstDayOfWeek} currentData={currentData || null} />) :
        (menuModesDate[indexMenu].title == 'Year') ? (<YearGrid />) :
  'Какой необычный возраст!'
      }

      {/* <MonthGrid firstDayOfWeek={firstDayOfWeek} currentData={currentData || null} /> */}
      {/* <YearGrid /> */}
      
        
        
    
      
      
    </ShadowWrapper>
  );
};


export default Home;