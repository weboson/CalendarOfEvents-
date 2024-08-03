//! Страница авторизации (login и registartion (profile))
// Либо ВОЙТИ либо ЗАРЕГИСТРИРОВАТСЯ
// Exmple: http://localhost:3000/api/auth/profile or http://localhost:3000/api/auth/login
import { FC, useState } from 'react';

const Auth: FC = () => {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return <div>Auth</div>;
};

export default Auth;
