import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';
import { ArrSubMenu } from '../../data/arrSubMenu';
import RecipeList from '../Recipe/RecipeList';
import SubMenu from '../SubMenu/SubMenu';
import MealscheduleForm from './MealscheduleForm';
import MealscheduleList from './MealscheduleList';

const Mealschedule: FC = () => {
  const activeMenu = useAppSelector((state) => state.indexSubMenu);

  return (
    <>
      {/* indexItem - это для [1,2,3,4].slice(indexItem-2, indexItem) => [1,2] or [3,4] в ArrSubMenu.tsx */}
      {/* подменю: 'Add new', 'Recipes' */}
      <SubMenu indexItem={4} />
      {activeMenu == 0 ? (
        <>
          {/* цветной заголовок страниц для Recipes и Mealschedule)*/}
          <ColorHeader
            title={ArrSubMenu[activeMenu + 2].colorHeader}
            iconName={'SlNote'}
          />
          <MealscheduleForm />
        </>
      ) : (
        <>
          {/* цветной заголовок страниц для Recipes и Mealschedule)*/}
          <ColorHeader
            title={ArrSubMenu[activeMenu + 2].colorHeader}
            iconName={'FaRegListAlt'}
          />
          <MealscheduleList />
        </>
      )}
    </>
  );
};

export default Mealschedule;
