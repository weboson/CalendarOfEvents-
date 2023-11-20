import { FC, useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import {
  DivWrapper,
  TitleCalendar,
  StyleIconPlus,
  TitleCalendarWrapper,
  ButtonsWrapper,
  ModeDateButton,
} from './stylesHeader/sc_calendarHeader';


const Header: FC = () => {
  const menuModesDate = ['Day', 'Week', 'Month', 'Year'];


  const [active, setActive] = useState<number>(2);
 
  const handleClick = (index: number) => {
    setActive(index);
    //console.log(index)
    
  }

  return (
    <>
      <DivWrapper>
        <TitleCalendarWrapper>
          <TitleCalendar>Calendar of events</TitleCalendar>
          <StyleIconPlus>
            <FaCalendarPlus />
          </StyleIconPlus>
        </TitleCalendarWrapper>
        <ButtonsWrapper>
          {menuModesDate.map((item, index, array) => (
            <ModeDateButton
              key={index}
              // закругление крайних углов
              $extremeButtonLeft={array.indexOf(item) === 0  ? true : false}
              $extremeButtonRight={array.indexOf(item) === array.length - 1  ? true : false}
              // активная кнопка
              onClick={() => handleClick(index)}
              $isCurrentModeDate={active == index ? true : false}
            >
              {item}
            </ModeDateButton>
          ))}
        </ButtonsWrapper>
        <div>Serach</div>
      </DivWrapper>
    </>
  );
};

export default Header;
