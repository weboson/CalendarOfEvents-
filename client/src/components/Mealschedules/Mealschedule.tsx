import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import SubMenu from '../SubMenu/SubMenu';

const Mealschedule: FC = () => {
  const indexSubMenu = useAppSelector((state) => state.indexSubMenu);

  return (
    <>
      {/* подменю: 'Add new', 'Recipes' */}
      <SubMenu indexItem={4}/>
    </>
  );
};

export default Mealschedule;
