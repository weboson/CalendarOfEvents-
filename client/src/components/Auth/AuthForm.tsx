// Форма для ввода Email и Password (как для регистрации, так и для авторизации)
// Для проверки работоспособности необходимо запустить server командой npm run start:dev
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormWrappeer } from './sc_Auth';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { MdOutlineAlternateEmail, MdOutlinePassword } from 'react-icons/md';
import { AuthService } from '../../services/auth.service';
import { IUserData } from '../../types/types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingIsAuth } from '../../store/features/isAuthSlice';

const AuthForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать  форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  // formState - состояние формы
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm<IUserData>({
    // как в примере: https://react-hook-form.com/docs/useform/handlesubmit
    mode: 'onChange', //! режим реагирования на изменение
  });

  // ReduxTK
  const dispatch = useAppDispatch();
  // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\isAuthSlice.ts)
  const isAuth = useAppSelector((state) => state.isAuth);

  // обработчик для регистрации (логика в client\src\serviсes\auth.service.ts)
  const registrationHandler: SubmitHandler<IUserData> = async (
    data: IUserData,
  ) => {
    try {
      //   e?.preventDefault; // сброс настроек браузера по-умолчанию при отправке формы
      const response = await AuthService.registration(data);

      if (response) {
        toast.success('Регистрация прошла успешно!');
      }
      // после регистрации: меняем isAuthSlice.ts на true, и в colorHeader изменится заголовок на 'Войти в систему' и потом вводим зарегистрируемые данные (email,pass)
      dispatch(readingIsAuth(true)); // isAuth = true
    } catch (err: any) {
      const error = err.response?.data.message; // если есть response то ...
      toast.error(error.toString());
    }
  };

  // обработчик для login
  const loginHandler: SubmitHandler<IUserData> = async (data: IUserData) => {
    // try {
    //   e.preventDefault; // сброс настроек браузера по-умолчанию при отправке формы
    //   const response = await AuthService.registration(data);
    //   if (response) {
    //     toast.success('Регистрация прошла успешно!');
    //   }
    //   // после регистрации: меняем isAuthSlice.ts на true, и в colorHeader изменится заголовок на 'Войти в систему' и потом вводим зарегистрируемые данные (email,pass)
    //   dispatch(readingIsAuth(true)); // isAuth = true
    // } catch (err: any) {
    //   const error = err.response?.data.message; // если есть response то ...
    //   toast.error(error.toString());
    // }
  };

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    // let response = await fetch('http://localhost:3000/api/auth', {
    //   method: 'POST',
    //   headers: {
    //     Authorization:
    //       `Bearer ` +
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTcyMTczMTc3NywiZXhwIjoxNzI0MzIzNzc3fQ.4L6kQUNJJtaVHtE__eekqjSqvbNwqBO44-QDNmQk_L0',
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    //   body: JSON.stringify(data),
    // });
  }; // data возращает handleSubmit от 'react-hook-form'

  return (
    <FormWrappeer>
      {isAuth ? (
        <form onSubmit={handleSubmit(loginHandler)} action="">
          <Box component="section">
            <Button
              style={{ margin: '3px 0', width: '30%', textAlign: 'center' }}
              variant="contained"
              type="submit"
            >
              Выйти
            </Button>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleSubmit(registrationHandler)} action="">
          <Box component="section">
            {/* //! Email */}
            <Typography
              id="titleEmail"
              variant="h2"
              component="h2"
              margin="normal"
              sx={{
                textAlign: 'center',
                fontSize: '2.5em',
                color: '#6f6e6e',
                margin: '1%',
              }}
            >
              Введите Email:
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineAlternateEmail />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                margin: '2%',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={
                errors?.email ? 'Пока не валидный Email' : 'Валидный Email'
              }
              error={!!errors?.email}
              // от react-form-hook
              {...register('email', {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, // валидатор на Email (Регулярные выражение взял с интернета)
              })}
              type="text"
              name="email"
              placeholder="name@post.com"
              helperText="Введите Email"
              required
            />

            {/* //! Password */}
            <Typography
              id="titlePassword"
              variant="h2"
              component="h2"
              margin="normal"
              sx={{
                textAlign: 'center',
                fontSize: '2.5em',
                color: '#6f6e6e',
                margin: '1%',
              }}
            >
              Введите пароль:
            </Typography>

            {/* Совет */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '400',
                margin: '0 2%',
              }}
            >
              *Пароль должен содержать: <br />
              1. латинские буквы в разных регистрах, <br />
              2. Цифры <br />
              3. И специальные символы{' '} <br />
            </Typography>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlinePassword />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                margin: '2%',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={errors?.password ? 'Слишком простой пароль' : 'Password'}
              error={!!errors?.password}
              // от react-form-hook
              {...register('password', {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, // валидатор на Password (Регулярные выражение взял с интернета: https://sky.pro/wiki/javascript/sozdanie-regulyarnogo-vyrazheniya-dlya-parolya-v-java-script/)
              })}
              type="text"
              name="password"
              placeholder="Например: 12345Yy$"
              helperText="Введите пароль"
              required
            />

            {/* //! кнопка "отправить" */}
            <Button
              style={{ margin: '3px 0', width: '30%', textAlign: 'center' }}
              variant="contained"
              type="submit"
              disabled={errors?.title ? true : false} // если Email не валидный
            >
              {(isAuth) ? 'Войти' : 'Зарегистрироватся'}
            </Button>
          </Box>
        </form>
      )}
    </FormWrappeer>
  );
};

export default AuthForm;
