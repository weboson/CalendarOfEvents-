import { FC, memo } from 'react';
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


const Headers: FC = () => {

  // redux-toolkit
  const activeMenu = useAppSelector((state) => state.menu)

  const dispatch = useAppDispatch()
  
  const handleClick = (index: number) => {
    // redux-toolkit
    dispatch(readingMenu(index))
  };
  console.log('rememo')
  return (
    <div id='header'> 
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
              $isCurrentModeDate={activeMenu == index ? true : false}
              
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
    </div>
  );
};

export const Header = memo(Headers); // memo, чтобы не рендерился при каждом изменении других комопнентов
