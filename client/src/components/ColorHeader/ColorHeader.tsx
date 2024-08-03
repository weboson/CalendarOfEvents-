import { FC } from 'react';
import { SlNote } from 'react-icons/sl';
import { FaRegListAlt } from 'react-icons/fa';
import { HeadlineBlock, HeadlineWrapper } from './sc_ColorHeader';

interface IColorHeader {
  title: string;
  iconName: string
}

const ColorHeader: FC<IColorHeader> = ({ title, iconName }) => {
  return (
    <HeadlineBlock>
      <HeadlineWrapper>
        <h1>
          {(iconName == 'SlNote') ? (<SlNote />) : (<FaRegListAlt />)}
          {title}
        </h1>
      </HeadlineWrapper>
    </HeadlineBlock>
  );
};

export default ColorHeader;
