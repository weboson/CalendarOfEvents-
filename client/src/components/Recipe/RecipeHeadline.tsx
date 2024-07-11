import { FC } from 'react';
import { HeadlineBlock, HeadlineWrapper } from './stylesRecipePage/sc_RecipePage';
import { SlNote } from 'react-icons/sl';

const RecipeHeadline: FC = () => {
  return (
    <HeadlineBlock>
      <HeadlineWrapper>
        <h1>
          <SlNote />
          Добавьте рецепт
        </h1>
      </HeadlineWrapper>
    </HeadlineBlock>
  );
};

export default RecipeHeadline;
