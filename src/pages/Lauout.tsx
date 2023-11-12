import { FC } from 'react';
import { Outlet } from 'react-router-dom'; // означет главный шаблон для всех компонентов
import Header from '../components/header/Header';

const Lauout: FC = () => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className='ew'>
        <Outlet />
      </div>
    </div>
  );
};

export default Lauout;
