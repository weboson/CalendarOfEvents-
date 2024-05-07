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
  ButtonRecipes,
  RecipesWrapper,
} from './stylesHeader/sc_calendarHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingMenu } from '../../store/features/modesDateSlice';
import { menuModesDate } from '../../data/dataMenu';
// Recipes - будет отдельной страницей
// link от React-router-dom  - для НЕ ПЕРЕЗАГРУЖАЕМЫХ страницу  ССЫЛОК
import { Link } from 'react-router-dom';

const Headers: FC = () => {
  // redux-toolkit
  const activeMenu = useAppSelector((state) => state.menu);

  const dispatch = useAppDispatch();

  const handleClick = (index: number) => {
    // redux-toolkit
    dispatch(readingMenu(index));
  };
  console.log('rememo');
  return (
    <div id="header">
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
          {/* //! Link от react-router-dom: то есть, чтобы при нажатии кнопок режимов был автоматический переход в среду Home (localhost), а то в localhost/recipes кнопки не работают */}
        <Link to={'/'}>
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
            </Link>
        </ButtonsWrapper>
        {/* Поиск */}

        <SearchWrapper>
          {/*//! кнопка 'Recipes' */}
          <RecipesWrapper>
            <ButtonRecipes
            // $isActiveButtonRecipes = {}
            >
              Recipes
            </ButtonRecipes>
          </RecipesWrapper>

          <FormRouterSearch>
            <InputButtonSearch>
              <FaSearch />
            </InputButtonSearch>
            <InputSearch placeholder="Search" />
          </FormRouterSearch>
        </SearchWrapper>
      </DivWrapper>
    </div>
  );
};

export const Header = memo(Headers); // memo, чтобы не рендерился при каждом изменении других комопнентов
