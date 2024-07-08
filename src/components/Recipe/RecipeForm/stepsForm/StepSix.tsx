//! Step 6: Поле ввода "Дата старта курса" (дата начала приёма ЛС): input type="date"
// от дополнительной библиотеке "x-date-pickers" (AdapterDayjs идет от "dayjs")
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru'; // для формата даты
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { FC, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import dayjs from 'dayjs';
import moment from 'moment';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

interface IProps {
  register: UseFormRegister<FieldValues>; // от 'react-hook-form'
  control: Control<FieldValues, any>;
}

const StepSix: FC<IProps> = ({ control, register }) => {

  const [val, setValue] = useState()
  console.log(val)  
  return (
    //! дата старта
    <FormStep>
      <Typography
        id="stepTitle"
        variant="h6"
        component="h6"
        margin="normal"
        sx={{
          fontSize: '1.6em',
          color: '#6f6e6e',
          margin: '2%',
        }}
      >
        Шаг #6: Дата начала курса:
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* воспользуюсь moment() для текущего дня */}
        {/* по обычному захватить значение не получится, нужно "...fieldProps"*/}
        {/* проблема: возращаемый формат не нравится ("2024-07-07T19:00:00.000Z"), придется при отправке на сервер: JSON.stringify(data.start).slice(0,11) */}
        <Controller
          control={control}
          name="start"
          defaultValue={dayjs(moment().format('YYYY-MM-DD'))} // ? set defaultValue
          rules={{ 
            required: true
          }}
          render={({ field: { onChange, ...fieldProps } }) => {
            return (
              <>
                <DatePicker
                  {...fieldProps}
                  onChange={onChange}
                  // onChange={onChange}
                  defaultValue={dayjs(moment().format('YYYY-MM-DD'))}
                  format={'DD.MM.YYYY'} // формат показываемой даты
                  name="start"
                />
              </>
            );
          }}
        />

        {/* Или так: "new Date()"*/}
        {/* <DatePicker defaultValue={dayjs(new Date().toJSON().slice(0, 10))}/> 
        // '2024-06-10T15:42:33.895Z' -> slice(0,10) -> '2024-06-10' */}
      </LocalizationProvider>

      {/* <input
              {...register('start2')}
              name="start"
              type="date"
              id="startDate"
              value={new Date().toJSON().slice(0, 10)} // '2024-06-10T15:42:33.895Z' -> slice(0,10) -> '2024-06-10'
            /> */}
    </FormStep>
  );
};

export default StepSix;
