import { FC } from 'react';
import {
  HeadlineBlock,
  HeadlineWrapper,
} from './stylesRecipePage/sc_RecipePage';
import { SlNote } from 'react-icons/sl';
import { FaRegListAlt } from 'react-icons/fa';

interface IRecipeHeadline {
  RecipeHeadlineTitle: string;
  iconName: string
}

const RecipeHeadline: FC<IRecipeHeadline> = ({ RecipeHeadlineTitle, iconName }) => {
  return (
    <HeadlineBlock>
      <HeadlineWrapper>
        <h1>
          {(iconName == 'SlNote') ? (<SlNote />) : (<FaRegListAlt />)}
          {RecipeHeadlineTitle}
        </h1>
      </HeadlineWrapper>
    </HeadlineBlock>
  );
};

export default RecipeHeadline;
