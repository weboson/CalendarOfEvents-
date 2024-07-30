import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm/RecipeForm';
import RecipeHeadline from './RecipeHeadline';
import RecipeMenu from './RecipeMenu';

const RecipePage: FC = () => {
  return (
    <WrapperRecipes>
      {/* подменю: 'Add new', 'Recipes' */}
      <RecipeMenu />
      {/* заголовок */}
      <RecipeHeadline />
      {/* форма */}
      <RecipeForm />
    </WrapperRecipes>
  );
};

export default RecipePage;
