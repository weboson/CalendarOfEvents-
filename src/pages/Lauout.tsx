import { FC } from 'react';
import { Outlet } from 'react-router-dom'; // означет главный шаблон для всех компонентов


const Lauout: FC = () => {
  return (
    <>
        <Outlet />
    </>
  );
};

export default Lauout;
