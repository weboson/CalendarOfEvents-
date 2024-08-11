import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';
import AuthForm from './AuthForm';

const Auth: FC = () => {
    // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\isAuthSlice.ts)
    const isAuth = useAppSelector((state) => state.isAuth) 

  return (
    <>
      <ColorHeader
        title={(isAuth) ? 'Выйти из системы' : 'Регистрация / Войти в систему'}
        iconName={(isAuth) ? 'MdOutlineLogin' : 'MdOutlineLogout'}
      />

      <AuthForm />
    </>
  );
};

export default Auth;
