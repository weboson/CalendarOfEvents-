import {FC} from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid';
import moment, { Moment } from 'moment'; // для расчетов даты - Moment - это специальный тип для TS 


// чтобы неделя начаналась с понедельника, а не с воскресенья, как в США - поэтому прибавляем к week + 1
  moment.updateLocale('ru', {week: {dow: 1}});
  window.moment = moment; // тест
  // первый день недели касающий месяца
  const firstDayOfWeek: Moment = moment().startOf('month').startOf('week');
  // последний день недели касающиеся месяца
  const lastDayOfWeek: Moment = moment().endOf('month').endOf('week');

const Home: FC = () => {
    return (
        <div>
            <Header />
            <Monitor />
            <CalendarGrid firstDayOfWeek={firstDayOfWeek} lastDayOfWeek={lastDayOfWeek}/>
        </div>
    );
};

export default Home;