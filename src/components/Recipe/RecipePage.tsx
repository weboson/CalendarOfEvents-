import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm';

const RecipePage: FC = () => {
    return (
        <WrapperRecipes>
           <RecipeForm />
        </WrapperRecipes>
    );
};

export default RecipePage;