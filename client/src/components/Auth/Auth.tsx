import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';

const Auth: FC = () => {
    // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\isAuthSlice.ts)
    const isAuth = useAppSelector((state) => state.isAuth) 


  return (
    <>
      <ColorHeader
        title={(isAuth) ? 'Выйти из системы' : 'Войти в систему'}
        iconName={(isAuth) ? 'MdOutlineLogin' : 'MdOutlineLogout'}
      />
    </>
  );
};

export default Auth;
