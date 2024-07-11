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
import { Link } from 'react-router-dom';

const Headers: FC = () => {
  const activeMenu = useAppSelector((state) => state.menu);

  const dispatch = useAppDispatch();
  // console.log(window.location.pathname);
  const handleClick = (index: number) => {
    //! записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
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
          <TitleCalendar>Calendar of events</TitleCalendar>
          <StyleIconPlus>
            <FaCalendarPlus />
          </StyleIconPlus>
        </TitleCalendarWrapper>
      </Link>
      {/* Menu */}
      <ButtonsWrapper>
        {/* // Link от react-router-dom*/}
        {/*//! кнопки из массива: Day,Week,Month,Year */}
        {menuModesDate.map((item, index, array) => {
          // первые 4 кнопки со ссылкой (<Link to={'/'}>)
          if (index < 4) {
            return (
              // ссылка домашняя
              <Link to={'/'} key={index+1}>
                <ModeDateButton
                  key={index}
                  // active button/mode
                  onClick={() => handleClick(index)}
                  $isCurrentModeDate={activeMenu == index ? true : false}
                  // закругление углов левого края (кнопки Day)
                  $extremeButtonLeft={array.indexOf(item) === 0 ? true : false}
                  $extremeButtonRight={false}
                >
                  {item.title}
                </ModeDateButton>
              </Link>
            );
            {
              /*// Кнопка страницы Рецепты (Recipes) */
            }
            // кнопка Recipes со ссылкой на '<Link to={'/recipes'}>'
          } else if (index >= 4) {
            return (
              <Link to={'/recipes'} key={index+2}>
                <ModeDateButton
                  key={4}
                  // active button/mode
                  onClick={() => handleClick(index)}
                  $isCurrentModeDate={activeMenu == index ? true : false}
                  // закругление углов левого края (кнопки Day)
                  $extremeButtonLeft={array.indexOf(item) === 0 ? true : false}
                  $extremeButtonRight={true}
                >
                  {item.title}
                </ModeDateButton>
              </Link>
            );
          }
        })}
      </ButtonsWrapper>
      {/* Поиск */}

      <SearchWrapper>
        {/*//! кнопка 'Recipes' */}
        <LoginWrapper>
          {/* //! ссылка */}
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
