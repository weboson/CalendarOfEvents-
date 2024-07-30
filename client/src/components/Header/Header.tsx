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
  LoginWrapper,
  ButtonLogin,
} from './stylesHeader/sc_calendarHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingMenu } from '../../store/features/modesDateSlice';
import { menuModesDate } from '../../data/dataMenu';
// Recipes - будет отдельной страницей
// link от React-router-dom  - для НЕ ПЕРЕЗАГРУЖАЕМЫХ страницу  ССЫЛОК
import { Link, NavLink } from 'react-router-dom';

const Headers: FC = () => {
  // залогинены или нет, будет отображен "Log in" и "Log out"
  const isAuth = true;

  const activeMenu = useAppSelector((state) => state.menu);

  const dispatch = useAppDispatch();
  // console.log(window.location.pathname);
  const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    sessionStorage.setItem('IndexMenu', index.toString()); // например, если нажать на кнопку "Recipes", то после обновления страницы, будет режим "Recipes"
    // redux-toolkit
    dispatch(readingMenu(index));
  };
  console.log('rememo');
  return (
    <DivWrapper>
      {/* Заголовок */}
      <Link to={'/'}>
        <TitleCalendarWrapper>
          <TitleCalendar>MedСalendar</TitleCalendar>
          <StyleIconPlus>
            <FaCalendarPlus size="15" />
          </StyleIconPlus>
        </TitleCalendarWrapper>
      </Link>
      {/*//! Menu */}
      <ButtonsWrapper>
        {/* // NavLink от react-router-dom*/}
        {/*// кнопки из массива: Day,Week,Month,Year или Recipe и Mealschedules */}
        {menuModesDate.map((item, index, array) => (
          <NavLink
            to={`${item.UrlParams}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            <ModeDateButton
              // закругление углов левого края (кнопки Day)
              
              $isCurrentModeDate={activeMenu == index ? true : false}
              $extremeButtonLeft={index == 0 ? true : false}
              $extremeButtonRight={index == array.length - 1 ? true : false}
            >
              {item.title}
            </ModeDateButton>
          </NavLink>
        ))}
      </ButtonsWrapper>
      {/* Поиск */}

      <SearchWrapper>
        <LoginWrapper>
          {/* //! login */}
          <Link to={'/login'}>
            <ButtonLogin
            // $isActiveButtonLogin = {}
            >
              login
            </ButtonLogin>
          </Link>
        </LoginWrapper>

        <FormRouterSearch>
          <InputButtonSearch>
            <FaSearch />
          </InputButtonSearch>
          <InputSearch placeholder="Search" />
        </FormRouterSearch>
      </SearchWrapper>
    </DivWrapper>
  );
};

export const Header = memo(Headers); // memo, чтобы не рендерился при каждом изменении других комопнентов
