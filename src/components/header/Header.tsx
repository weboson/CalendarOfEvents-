import { FC, useState } from 'react';
import { FaCalendarPlus, FaSearch } from 'react-icons/fa';
import {
  DivWrapper,
  TitleCalendar,
  StyleIconPlus,
  TitleCalendarWrapper,
  ButtonsWrapper,
  ModeDateButton,
  SearchWrapper,
  FormRouterSearch,
  InputSearch,
  InputButtonSearch,
} from './stylesHeader/sc_calendarHeader';
import { useAppDispatch } from '../../store/hooks';
import { readingMenu } from '../../store/features/modesDateSlice';

  // !
// Define a type for the slice state
interface IModeDate {
  id: number;
  type: string;
  format: string
}

interface IMenuModesDate extends Array<IModeDate>{}

// значение по умолчанию (в данном проекте значения менять не будем - просто учимся Rudax Toolkit)
const menuModesDate: IMenuModesDate = [
  {id: 1, type: 'Day', format: 'D'},
  {id: 2, type: 'Week', format: 'W'},
  {id: 3, type: 'Month', format: 'MM'},
  {id: 4, type: 'Year', format: 'YY'},
]

const Header: FC = () => {

  // active button (day, week, month, year)
  const [activeButton, setActiveButton] = useState<number>(1);

  // redux-toolkit
  const dispatch = useAppDispatch()

  // selected Mode (day, week, month, year)
  //const [selectedMode, setSelectedMode] = useState(menuModesDate[activeButton])
  
  const handleClick = (index: number) => {
    setActiveButton(index);
    // redux-toolkit
    dispatch(readingMenu(activeButton))
    //console.log(activeButton)
    //setSelectedMode(menuModesDate[activeButton])
    // console.log(selectedMode)
    return
  };

  return (
    <>
      <DivWrapper>
        {/* Заголовок */}
        <TitleCalendarWrapper>
          <TitleCalendar>Calendar of events</TitleCalendar>
          <StyleIconPlus>
            <FaCalendarPlus />
          </StyleIconPlus>
        </TitleCalendarWrapper>
        {/* Menu */}
        <ButtonsWrapper>
          {menuModesDate.map((item, index, array) => (
            <ModeDateButton
              key={index}
              // active button/mode
              onClick={() => handleClick(index)}
              $isCurrentModeDate={activeButton == index ? true : false}
              
              // закругление крайних углов
              $extremeButtonLeft={array.indexOf(item) === 0 ? true : false}
              $extremeButtonRight={
                array.indexOf(item) === array.length - 1 ? true : false
              }
            >
              {item.type}
            </ModeDateButton>
          ))}
        </ButtonsWrapper>
        {/* Поиск */}
        <SearchWrapper>
          <FormRouterSearch>
            <InputButtonSearch><FaSearch/></InputButtonSearch>
            <InputSearch placeholder='Search'/>
          </FormRouterSearch>
        </SearchWrapper>
      </DivWrapper>
    </>
  );
};

export default Header;
