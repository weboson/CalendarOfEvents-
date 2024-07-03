//! Step 3: Поле ввода (input type="number") интервала времени приёма лекарства
import { FC } from 'react';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

interface IProps {
  register: UseFormRegister<FieldValues>; // от 'react-hook-form'
  errors: FieldErrors<FieldValues>; // от 'react-hook-form'
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, any>;
}

const StepThree: FC<IProps> = ({ register, errors, watch, control }) => {
  return (
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
          Шаг #3: Особенности приёма
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '1.2em',
            color: '#6f6e6e',
            fontWeight: '400',
            margin: '2%',
          }}
        >
          Принимать лекарство:{' '}
        </Typography>
        {/* //! перед, вовремя, после */}
        {/*//* Controller от "react-hook-form", чтобы значения при "disabled" не отправлялись данные из "defaultValue" */}
        {/*// Обычный {...register()}  при "disabled" всё равно отправляет объекты со значениями (defaultValue) */}
        <FormControl fullWidth>
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="position" //! имя поля
          defaultValue={'before'} // ? set defaultValue
          rules={{
            required: !watch('independently'), // если галочки нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently'), //? true = ничего отправляет
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <Select
                // {...register('position')} // Обычный {...register()}  при "disabled" всё равно отправляет объекты со значениями (defaultValue)
                name="position"
                id="position"
                disabled={watch('independently')} // если галочка то не активна
                defaultValue={'before'}
                // label="Age"
              >
                <MenuItem value={'before'} selected>
                  перед
                </MenuItem>
                <MenuItem value={'while'}>вовремя</MenuItem>
                <MenuItem value={'after'}>после</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>
      {/* //! еда, завтрак, ужин... */}
      <FormControl fullWidth>
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="action" //! имя поля
          defaultValue={'eating'} // ? set defaultValue
          rules={{
            required: !watch('independently'), // если галочка нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently'), //? true = ничего отправляет
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <Select
                // {...register('action')} // Обычный {...register()}  при "disabled" всё равно отправляет объекты со значениями (defaultValue)
                name="action"
                id="action"
                disabled={watch('independently')} // если галочка то не активна
                defaultValue={'eating'}
                // label="Age"
              >
                <MenuItem value={'eating'} selected>
                  приём пищи
                </MenuItem>
                <MenuItem value={'firstBreakfast'}>завтрак</MenuItem>
                <MenuItem value={'lastSupper'}>ужин</MenuItem>
                <MenuItem value={'sleep'}>сон</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>
    </FormStep>
  );
};

export default StepThree;
