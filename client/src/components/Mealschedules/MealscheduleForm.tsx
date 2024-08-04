import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormWrappeer } from './sc_Mealschedule';
import { DoubleScrollBar } from './DoubleScrollBar/DoubleScrollBar';
import { Button } from '@mui/material';

const MealscheduleForm: FC = () => {
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

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    // после того, как я сделал Nest backend: https://github.com/weboson/CalendarOfEvents-/commit/4408a7d85598a8aa2cb891c4aadd08372661a1e6
    // тестирую свой бэкенд используя нативный fetch()
    // let response = await fetch('http://localhost:3000/api/recipes', {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper-1">
          <h4>В будни:</h4>
          <span id="display2"></span>
          <span id="display1"></span>

          <DoubleScrollBar
            register={register}
            key={'range1'}
            min={1}
            max={24}
            step={1}
            forid="display1"
            classElem="weekday"
          />
        </div>

        {/* Форма  */}
        {/* В выходные */}
        <h4>В выходные</h4>
        <div className="wrapper-3">
          <DoubleScrollBar
            register={register}
            key={'range3'}
            min={1}
            max={24}
            step={1}
            forid="display3"
            classElem="weekend"
          />
          <div id="display3"></div>
        </div>
        {/* //! кнопка "отправить" */}
        <Button style={{ margin: '3px 0' }} variant="contained" type="submit">
          Отправить
        </Button>
      </form>
    </FormWrappeer>
  );
};

export default MealscheduleForm;
