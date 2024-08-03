import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm/RecipeForm';
import { useAppSelector } from '../../store/hooks';
import RecipeList from './RecipeList';
import ColorHeader from '../ColorHeader/ColorHeader';
import SubMenu from '../SubMenu/SubMenu';
import { ArrSubMenu } from '../../data/arrSubMenu';

const Recipe: FC = () => {
  const activeMenu = useAppSelector((state) => state.indexSubMenu);
  return (
    <WrapperRecipes>
      {/* id - это 2 элемента до 2-х в ArrSubMenu.tsx */}
      {/* подменю: 'Add new', 'Recipes' */}
      <SubMenu indexItem={2}/> 

      {/* Если array['Add new'], то отобразится 'RecipeForm' иначе ''
      // ArrayRecipeMenu в src\data\recipeMenu.ts, а indexRecipeMenu хранится в src\store\features\modesRecipeSlice.ts и меняется в обработчике в RecipeMenu.tsx] */}
      {ArrSubMenu[activeMenu].title == 'Add new' ? (
        <>
          {/* цветной заголовок страницы для RecipeForm (Add new)*/}
          <ColorHeader
            title={
              ArrSubMenu[activeMenu].colorHeader
            }
            iconName={'SlNote'}
          />
          <RecipeForm />
        </>
      ) : (
        <>
          {/* цветной заголовок страницы для RecipeList (recipes)*/}
          <ColorHeader
            title={
              ArrSubMenu[activeMenu].colorHeader
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

export default Recipe;
