import {FC} from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid';
import moment, { Moment } from 'moment'; // для расчетов даты - Moment - это специальный тип для TS 
import styled from 'styled-components';

// sc-style
const ShadowWrapper = styled('div')`
    border-radius: 8px;
    border: 1px solid #464648;
    overflow: hidden;
    box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`

// чтобы неделя начаналась с понедельника, а не с воскресенья, как в США - поэтому прибавляем к week + 1
  moment.updateLocale('ru', {week: {dow: 1}});
  //window.moment = moment; // тест
  const currentDate = moment()
  // первый день недели касающий месяца
  const firstDayOfWeek: Moment = currentDate.clone().startOf('month').startOf('week');
  // последний день недели касающиеся месяца
  //const lastDayOfWeek: Moment = moment().endOf('month').endOf('week');
  // Заголовок месяца в Header
  //const today = 

const Home: FC = () => {
    return (
        <ShadowWrapper>
            <Header />
            <Monitor currentDate={currentDate}/>
            <CalendarGrid firstDayOfWeek={firstDayOfWeek}/>
        </ShadowWrapper>
    );
};

export default Home;