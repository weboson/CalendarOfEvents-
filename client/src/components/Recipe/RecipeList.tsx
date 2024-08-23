import { FC, useEffect, useState } from 'react';
import { ListWrappeer } from './stylesRecipePage/sc_RecipePage';
import { RecipeService } from '../../services/recipe.service';
import { IRecipeRepository } from '../../types/types';

const RecipeList: FC = () => {
  // пустые данные
  const [data, setData] = useState<IRecipeRepository[]>([]);
  
  // получить весь список рецептов
  const getAllRecipes = async () => {
    const response = await RecipeService.getAll();
    // установить полученные данные
    setData(response);
    return data;
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  // console.log(data)

  if (data.length) {
    return (
      <ListWrappeer>
        {data.map((item, index, array) => {
          return <div key={index}>{item.title}</div>;
        })}
      </ListWrappeer>
    );
  }
};

export default RecipeList;
