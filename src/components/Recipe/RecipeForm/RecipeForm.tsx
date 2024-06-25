import { FC } from 'react';
import {
  FormStep,
  FromWrappeer,
} from '../stylesRecipePage/sc_RecipePage';
import { useForm } from 'react-hook-form'; // lib for forms
import { Box, InputAdornment, TextField, Typography } from '@mui/material'; // material UI (CSS-фрейворк, ngf Bootstrap)
import StepOne from './stepsForm/StepOne';
import StepTwo from './stepsForm/StepTwo';

const RecipeForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать  форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  // formState - состояние формы
  const {
    control,
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm({
    mode: 'onChange', //! режим реагирования на изменение
  });

  // решил прямо в атрибутах input выполнить этот код
  // установка даты по-умолчанию через useEffect в input type="date"
  // useEffect(() => {
  //   document.querySelector('#startDate')!.value = (new Date()).toJSON().slice(0,10)
  // }, []);

  const onSubmit = (data: any) => console.log(JSON.stringify(data)); // data возращает handleSubmit от 'react-hook-form'

  return (
    <>
      <FromWrappeer>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step #1: Поле ввода названия лекарства (пропсы от 'react-hook-form')*/}
          <StepOne register={register} errors={errors}/>
          {/* Step #2 Поле ввода интервала времени приёма лекарства (пропсы от 'react-hook-form')*/}
          <StepTwo register={register} errors={errors} watch={watch} control={control}/>


          {/* //! До, вовремя, после */}
          <div>
            <h4>Особенности приёма: </h4>
            <label>
              <span>Принимать лекарство: </span>
              <select
                {...register('position')}
                name="position"
                id="position"
                disabled={watch('independently')} // если галочка то не активна
              >
                <option key={'before'} value="before">
                  перед
                </option>
                <option key={'while'} value="while">
                  вовремя
                </option>
                <option key={'after'} value="after">
                  после
                </option>
              </select>
              {/* //! еда, завтрак, ужин... */}
              <select
                {...register('action')}
                name="action"
                id="action"
                disabled={watch('independently')} // если галочка то не активна
              >
                <option key={'eating'} value="eating">
                  приём пищи
                </option>
                <option key={'firstBreakfast'} value="firstBreakfast">
                  завтрак
                </option>
                <option key={'lastSupper'} value="lastSupper">
                  ужин
                </option>
                <option key={'sleep'} value="sleep">
                  сон
                </option>
              </select>
            </label>
          </div>

          {/* //! Количество приёмов */}
          <h3>Количество приёмов</h3>
          <label>
            <input
              type="number"
              {...register('quantity')}
              name="quantity"
              id="quantity"
              defaultValue={'3'}
            />
            <span>раз[a]/</span>
            <span>в </span>
            <select {...register('unitTime')} name="unitTime" id="unitTime">
              <option key={'day'} value="day">
                день
              </option>
              <option key={'week'} value="week">
                неделю
              </option>
              <option key={'month'} value="month">
                месяц
              </option>
            </select>
          </label>

          {/* //! Курс приёма */}
          <div>
            <h4>Курс (продолжительноть приёма ЛС)</h4>
            <input
              type="text"
              defaultValue={'1'}
              {...register('duration.index')}
            />
            <select
              id="duration"
              {...register('duration.title')}
              name="duration"
              defaultValue={'months'}
            >
              <option key={'days'} value="days">
                день{' '}
              </option>
              <option key={'weeks'} value="weeks">
                неделя
              </option>
              <option key={'months'} value="months">
                месяц
              </option>
              <option key={'years'} value="years">
                год
              </option>
            </select>
          </div>

          {/* //! дата старта */}
          <h4>Старт курса:</h4>
          <div>
            <label htmlFor="startDate"></label>
            {/* дата по-умолчанию устанавливается JS в useEffect */}
            <input
              {...register('start')}
              name="start"
              type="date"
              id="startDate"
              value={new Date().toJSON().slice(0, 10)} // '2024-06-10T15:42:33.895Z' -> slice(0,10) -> '2024-06-10'
            />
          </div>
          {/* //! кнопка отправки */}
          {/* <input type="submit" /> */}
          <button type="submit">Отправить</button>
        </form>
      </FromWrappeer>
    </>
  );
};

export default RecipeForm;
