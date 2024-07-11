//! страница /recipes (Рецепта) (используется в route.tsx)
import { FC } from 'react';
import RecipePage from '../components/Recipe/RecipePage';
import { useOutletContext } from 'react-router-dom';
import Monitor from '../components/Monitor/Monitor';
import { Moment } from 'moment';

//type для констант context-а
interface ArrayContextType extends Array<Moment> {}

const Recipes: FC = () => {
  // useOutletContext - это из (Outlet, Lauout.tsx) react-router-dom (чтобы передать пропсы)
  const [currentDate, prevHandler, todayHandler, nextHandler] =
    useOutletContext<ArrayContextType>();

  return (
    <>
    {/* Отображается тот вид монитора (Day, Week, Month or Year), на котором был остановлен на странице Home */}
    {/* Не стал отдельный Monitor для Recipes делать, чтобы не запутать читающего прогера, ведь уже есть Monitor.tsx */}
      <Monitor
        currentDate={currentDate}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <RecipePage />
    </>
  );
};

export default Recipes;
