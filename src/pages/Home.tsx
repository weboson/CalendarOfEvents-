import {FC, useState} from 'react';
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

  

const Home: FC = () => {

    moment.updateLocale('ru', {week: {dow: 1}}); // неделя начинается с понедельника
    //window.moment = moment; // тест
    const momentDate = moment()
    const [currentDate, setCurrenDate] = useState(momentDate)
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<Moment>(currentDate.clone().startOf('month').startOf('week'))
    

    
    // buttons: +/- month 
    const selectHandler = (vector: string) => {
        switch (vector) {
            case "prev": // - month
                setCurrenDate(currentDate.subtract(1, 'month')) // мутируем текущую дату ( - month)
                setFirstDayOfWeek(currentDate.clone().startOf('month').startOf('week')) // узнаем начало недели текущ месяц
                //console.log(currentDate)
            break;
            case "next": // + month
                setCurrenDate(currentDate.add(1, 'month')) // используя мутированную дату, снова мутируем ( + moth)
                setFirstDayOfWeek(currentDate.clone().startOf('month').startOf('week')) // узнаем начало недели текущ месяц
                //console.log(firstDayOfWeek)
                break;
            default:
                break;
        }
    }
    
    return (
        <ShadowWrapper>
            <Header />
            <Monitor currentDate={currentDate} selectHandler={selectHandler}/>
            <CalendarGrid firstDayOfWeek={firstDayOfWeek}/>
        </ShadowWrapper>
    );
};

export default Home;