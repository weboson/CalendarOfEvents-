import { FC } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingMenu } from '../../store/features/modesDateSlice';
import { menuModesDate } from '../../data/dataMenu';


const Header: FC = () => {

  // redux-toolkit
  const activeButton = useAppSelector((state) => state.menu)

  const dispatch = useAppDispatch()
  
  const handleClick = (index: number) => {
    // redux-toolkit
    dispatch(readingMenu(index))
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
              {item.title}
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
