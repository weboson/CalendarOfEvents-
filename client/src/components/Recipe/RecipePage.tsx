import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm/RecipeForm';
import RecipeHeadline from './RecipeHeadline';

const RecipePage: FC = () => {
  return (
    <WrapperRecipes>
      {/* заголовок */}
      <RecipeHeadline />
      {/* форма */}
      <RecipeForm />
    </WrapperRecipes>
  );
};

export default RecipePage;
