import { FC } from 'react';
import {
  RecipeMenuUl,
  RecipeMenuWrapper,
} from './stylesRecipePage/sc_RecipePage';
import { ArrayRecipeMenu } from '../../data/recipeMenu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingRecipeMenu } from '../../store/features/modesRecipeSlice';

const RecipeMenu: FC = () => {

const activeMenu = useAppSelector((state) => state.recipeMenu); // src\store\features\modesRecipeSlice.ts
const dispatch = useAppDispatch();
const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    sessionStorage.setItem('modeRecipeMenu', index.toString()); // например, если нажать на кнопку "Recipes", то после обновления страницы, будет режим "Recipes"
    // redux-toolkit
    dispatch(readingRecipeMenu(index));
  };
  return (
    <RecipeMenuWrapper>
      {ArrayRecipeMenu.map((item, index, array) => (
        <div key={index}>
          {/* Menu */}
          <RecipeMenuUl
            $isActiveModeDate={activeMenu == index ? true : false}
            $borderRadiusLeft={index == 0 ? true : false}
            $borderRadiusRight={index == array.length - 1 ? true : false}
          >
            <li onClick={() => handleClick(index)}>{item.title}</li>
          </RecipeMenuUl>
        </div>
      ))}
    </RecipeMenuWrapper>
  );
};

export default RecipeMenu;
