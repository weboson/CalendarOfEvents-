import { FC, useEffect, useState } from 'react';
import {
  Background,
  Cell,
  CellColumn,
  Flex,
  GapBackground,
  Grid,
  GridRecipes,
  GridTitle,
  GridWrapperRecipes,
  Row,
} from './stylesRecipePage/sc_RecipePage';
import { RecipeService } from '../../services/recipe.service';
import { IRecipeRepository } from '../../types/types';
import RecipeOne from './RecipeOne';

const RecipeList: FC = () => {
  // пустые данные
  const [data, setData] = useState<IRecipeRepository[]>([]);

  // получить весь список рецептов
  const getAllRecipes = async () => {
    const response = await RecipeService.getAll();
    console.log(response);
    // установить полученные данные
    setData(response);
    return data;
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  // console.log(data)

  const columnArr = [
    '№',
    'Наименование лекарства',
    'Приём вне зависимости',
    'Особенности приёма',
    'Количество приёмов',
    'Курс приёма ЛС',
    'Дата начала курса',
    'Удалить',
  ];

  if (data.length) {
    return (
      <Background>
        <GapBackground>
          {/* //! Заголовки */}
          {/* адаптация: Заголовки исчезают при сжатии >8 колонок */}
          <GridTitle>
            {columnArr.map((item, index, array) => (
              <CellColumn key={index + 1}>
                <p>{item}</p>
              </CellColumn>
            ))}
          </GridTitle>
          {/* //! Рецепты */}
          <GridWrapperRecipes>
              {data.map((id, index, arr) => (
                <GridRecipes key={index + 2}>
                  <RecipeOne recipe={id} index={index + 1} />
                </GridRecipes>
              ))}
          </GridWrapperRecipes>
        </GapBackground>
      </Background>
    );
  }
};

export default RecipeList;
