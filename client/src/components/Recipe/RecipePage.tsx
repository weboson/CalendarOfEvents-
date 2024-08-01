import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm/RecipeForm';
import RecipeHeadline from './RecipeHeadline';
import RecipeMenu from './RecipeMenu';
import { useAppSelector } from '../../store/hooks';
import { ArrayRecipeMenu } from '../../data/recipeMenu';
import RecipeList from './RecipeList';

const RecipePage: FC = () => {
  const indexRecipeMenu = useAppSelector((state) => state.recipeMenu);
  return (
    <WrapperRecipes>
      {/* подменю: 'Add new', 'Recipes' */}
      <RecipeMenu />

      {/* Если array['Add new'], то отобразится 'RecipeForm' иначе ''
      // ArrayRecipeMenu в src\data\recipeMenu.ts, а indexRecipeMenu хранится в src\store\features\modesRecipeSlice.ts и меняется в обработчике в RecipeMenu.tsx] */}
      {ArrayRecipeMenu[indexRecipeMenu].title == 'Add new' ? (
        <>
          {/* заголовок страницы*/}
          <RecipeHeadline
            RecipeHeadlineTitle={
              ArrayRecipeMenu[indexRecipeMenu].RecipeHeadlineTitle
            }
            iconName={'SlNote'}
          />
          <RecipeForm />
        </>
      ) : (
        <>
          {/* заголовок страницы*/}
          <RecipeHeadline
            RecipeHeadlineTitle={
              ArrayRecipeMenu[indexRecipeMenu].RecipeHeadlineTitle
            }
            iconName={'FaRegListAlt'}
          />
          <RecipeList />
        </>
      )}
      {/* форма */}
    </WrapperRecipes>
  );
};

export default RecipePage;
