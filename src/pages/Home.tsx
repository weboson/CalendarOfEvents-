import { FC, useState } from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid';
import moment from 'moment'; // для расчетов даты - Moment - это специальный тип для TS
import styled from 'styled-components';

// sc-style
const ShadowWrapper = styled('div')`
  border-radius: 8px;
  border: 1px solid #464648;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

const Home: FC = () => {
  moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника
  //window.moment = moment; // тест
  const [today, setToday] = useState(moment());
  const firstDayOfWeek = today.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));


  return (
    <ShadowWrapper>
      <Header />
      <Monitor 
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
    />
      <CalendarGrid firstDayOfWeek={firstDayOfWeek} />
    </ShadowWrapper>
  );
};

export default Home;
