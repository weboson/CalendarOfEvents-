//! Step 3: Поле ввода (input type="number") интервала времени приёма лекарства
import { FC } from 'react';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import {
  Control,
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
      <FormControl fullWidth>
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
        <Select
          {...register('position')}
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
      </FormControl>
      {/* //! еда, завтрак, ужин... */}
      <FormControl fullWidth>
        <Select
          {...register('action')}
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
      </FormControl>
    </FormStep>
  );
};

export default StepThree;
