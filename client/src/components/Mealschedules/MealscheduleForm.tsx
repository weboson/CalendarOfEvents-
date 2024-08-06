import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormWrappeer } from './sc_Mealschedule';
import { Box, Button, Slider, Typography } from '@mui/material';

const MealscheduleForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать в форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  // formState - состояние формы
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue, // устнавить значение
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm({
    mode: 'onChange', //! режим реагирования на изменение
  });

  // const onChange = async () => {
  //   const watchAllFields = await watch(); // если в качестве аргумента ничего не передается, вы наблюдаете за всем
  //   console.log('watchAllFields', watchAllFields);
  //   const elem = document.querySelector('.po');
  //   elem.innerHTML = `${watchAllFields.weekday[0]}`;
  // };
  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
  }; // data возращает handleSubmit от 'react-hook-form'
  // наблюдение за значениями полей (как useState())
  const watchAllFields = watch(); // если в качестве аргумента ничего не передается, вы наблюдаете за всем
  // минимальное и максимальное время бодроствования
  const minDistance = 12;
  const maxDistance = 16;

  // обработчики одинаковые (кроме полей в setValue), но нужно их разделить, чтобы получать разные показатели
  // код обработчиков скопировал с: https://mui.com/material-ui/react-slider/#minimum-distance
  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    // если это не массив, то return
    if (!Array.isArray(newValue)) {
      return;
    }
    // console.log(activeThumb) // 0 - это первый ползунок, 1 - второй ползунок
    //* минимальное время бодроствования 12 часов(minDistance)
    if (newValue[1] - newValue[0] <= minDistance) {
      if (activeThumb === 0) {
        // (activeThumb - ползунок
        // 1-й ползунок
        const clamped = Math.min(newValue[0], 24 - minDistance); // (14, 12) => 12
        //* setValue - это из react-hook-form: https://react-hook-form.com/docs/useform/setvalue
        // устанваливает (изменяет) данные поля 'weekday'
        setValue('weekday', [clamped, clamped + minDistance]); // [12, 24]
      } else if (activeThumb === 1) {
        // 2-й ползунок
        const clamped = Math.max(newValue[1], minDistance);
        setValue('weekday', [clamped - minDistance, clamped]);
      }

      //* максимальное время бодроствования 16 часов(maxDistance) (сон не менее 8 часов)
    } else if (newValue[1] - newValue[0] >= maxDistance) {
      if (activeThumb === 0) {
        // 1-й ползунок
        const clamped = Math.min(newValue[0], 24 - maxDistance); // (14, 12) => 12
        setValue('weekday', [clamped, clamped + maxDistance]); // [12, 24]
      } else if (activeThumb === 1) {
        // 2-й ползунок
        const clamped = Math.max(newValue[1], maxDistance);
        setValue('weekday', [clamped - maxDistance, clamped]);
      }
    } else {
      setValue('weekday', newValue as number[]);
    }
  };

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 24 - minDistance);
        setValue('weekend', [clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue('weekend', [clamped - minDistance, clamped]);
      }
    } else if (newValue[1] - newValue[0] >= maxDistance) {
      if (activeThumb === 0) {
        // 1-й ползунок
        const clamped = Math.min(newValue[0], 24 - maxDistance); // (14, 12) => 12
        setValue('weekend', [clamped, clamped + maxDistance]); // [12, 24]
      } else if (activeThumb === 1) {
        // 2-й ползунок
        const clamped = Math.max(newValue[1], maxDistance);
        setValue('weekend', [clamped - maxDistance, clamped]);
      }
    } else {
      setValue('weekend', newValue as number[]);
    }
  };

  return (
    <FormWrappeer>
      <form onSubmit={handleSubmit(onSubmit)} action="/api">
        {/* Weekday */}
        <Box component="section">
          <Typography
            id="stepTitle"
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
            График приёма пищи в будни:
          </Typography>
          {/* под заголовок */}
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: '2em',
              color: '#6f6e6e',
              fontWeight: '400',
              margin: '1%',
            }}
          >
            Первый приём пищи:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekday
                ? `${watchAllFields.weekday[0]}:00`
                : '8:00'}
            </span>
            <br />
            Последний приём пищи:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekday
                ? `${watchAllFields.weekday[1]}:00`
                : '22:00'}
            </span>
            <br />
            Бодроствование:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekday
                ? `${
                    watchAllFields.weekday[1] - watchAllFields.weekday[0]
                  } часов`
                : '14 часов'}
            </span>
          </Typography>

          <Controller
            control={control}
            name="weekday"
            defaultValue={[8, 22]}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <>
                  <span
                    style={{
                      color:
                        (watchAllFields.weekday &&
                          watchAllFields.weekday[1] -
                            watchAllFields.weekday[0] ==
                            16 &&
                          'red') ||
                        '#1565c0',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: '1.6em',
                      marginTop: '-2%',
                    }}
                  >
                    *Рекомендовано спать не менее 8 часов и не более 12
                  </span>
                  <Slider
                    sx={
                      // если границы нарушены (сон должен быть <8)
                      watchAllFields.weekday
                        ? watchAllFields.weekday[1] -
                            watchAllFields.weekday[0] ==
                          16
                          ? { color: 'red' }
                          : null
                        : null
                    }
                    onChange={handleChange1}
                    defaultValue={[8, 22]}
                    value={
                      watchAllFields.weekday ? watchAllFields.weekday : [8, 22]
                    } // установить данные, которые меняются в обработчике
                    getAriaLabel={() => 'Minimum distance shift'}
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={1}
                    max={24}
                  />
                </>
              );
            }}
          />
        </Box>
        {/* Weekend */}
        <Box component="section">
          <Typography
            id="stepTitle"
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
            График приёма пищи в выходные:
          </Typography>
          {/* под заголовок */}
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: '2em',
              color: '#6f6e6e',
              fontWeight: '400',
              margin: '1%',
            }}
          >
            Первый приём пищи:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekend
                ? `${watchAllFields.weekend[0]}:00`
                : '9:00'}
            </span>
            <br />
            Последний приём пищи:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekend
                ? `${watchAllFields.weekend[1]}:00`
                : '22:00'}
            </span>
            <br />
            Бодроствование:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {watchAllFields.weekend
                ? `${
                    watchAllFields.weekend[1] - watchAllFields.weekend[0]
                  } часов`
                : '14 часов'}
            </span>
          </Typography>
          <Controller
            control={control}
            name="weekend"
            defaultValue={[9, 22]}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <>
                  <span
                    style={{
                      color:
                        (watchAllFields.weekend &&
                          watchAllFields.weekend[1] -
                            watchAllFields.weekend[0] ==
                            16 &&
                          'red') ||
                        '#1565c0',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: '1.6em',
                      marginTop: '-2%',
                    }}
                  >
                    *Рекомендовано спать не менее 8 часов и не более 12
                  </span>
                  <Slider
                    sx={
                      // если границы нарушены (сон должен быть <8)
                      watchAllFields.weekend
                        ? watchAllFields.weekend[1] -
                            watchAllFields.weekend[0] ==
                          16
                          ? { color: 'red' }
                          : null
                        : null
                    }
                    onChange={handleChange2}
                    defaultValue={[9, 22]}
                    value={
                      watchAllFields.weekend ? watchAllFields.weekend : [9, 22]
                    } // установить данные, которые меняются в обработчике
                    getAriaLabel={() => 'Minimum distance shift'}
                    valueLabelDisplay="on"
                    shiftStep={30}
                    step={1}
                    marks
                    min={1}
                    max={24}
                  />
                </>
              );
            }}
          />
        </Box>
        {/* // кнопка "отправить" */}
        <Button
          variant="contained"
          type="submit"
        >
          Отправить
        </Button>
      </form>
    </FormWrappeer>
  );
};

export default MealscheduleForm;
