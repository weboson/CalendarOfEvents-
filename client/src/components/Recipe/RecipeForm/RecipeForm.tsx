import { FC } from 'react';
import {
  FromWrappeer,
} from '../stylesRecipePage/sc_RecipePage';
import { useForm } from 'react-hook-form'; // lib for forms
import StepOne from './stepsForm/StepOne';
import StepTwo from './stepsForm/StepTwo';
import StepThree from './stepsForm/StepThree';
import StepFour from './stepsForm/StepFour';
import StepFive from './stepsForm/StepFive';
import StepSix from './stepsForm/StepSix';
import { Button } from '@mui/material';

const RecipeForm: FC = () => {
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
  } = useForm({
    mode: 'onChange', //! режим реагирования на изменение
  });

  const onSubmit = (data: any) => console.log(JSON.stringify(data)); // data возращает handleSubmit от 'react-hook-form'

  return (
    <>
      <FromWrappeer>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step #1: Поле ввода названия лекарства (пропсы от 'react-hook-form')*/}
          <StepOne register={register} errors={errors}/>
          {/* Step #2 Поле ввода интервала времени приёма лекарства (пропсы от 'react-hook-form')*/}
          <StepTwo register={register} errors={errors} watch={watch} control={control}/>
          {/* Step #3 Поле ввода "Особенности приёма": До, вовремя, после И  еды/завтрака...(пропсы от 'react-hook-form')*/}
          <StepThree register={register} watch={watch} control={control} />
          {/* Step #4 Поле ввода "Количество приёмов": например: 3 раза в день...(пропсы от 'react-hook-form')*/}
          <StepFour register={register} watch={watch} control={control} />
          {/* Step #5 Поле ввода "Курс приёма" (продолжительность приёма ЛС): (пропсы от 'react-hook-form')*/}
          <StepFive register={register} control={control} />
          {/* Step #6 Поле ввода "Дата старта курса" (дата начала приёма ЛС): (пропсы от 'react-hook-form')*/}
          <StepSix control={control} />
          {/* //! кнопка отправки в StepSix*/}

        </form>
      </FromWrappeer>
    </>
  );
};

export default RecipeForm;