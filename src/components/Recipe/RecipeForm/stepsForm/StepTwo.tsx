//! Step 2: Поле ввода (input type="number") интервала времени приёма лекарства
// Численный input в Material-UI двольно сложно реализуется: https://mui.com/base-ui/react-number-input/
import { FC } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

// Численный input в Material-UI двольно сложно реализуется, поэтому так много кода и импортов
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <FaPlus />, // использую иконку из react-icons
          className: 'increment',
          type: 'button', //! чтобы не сабмитилась форма
        },
        decrementButton: {
          children: <FaMinus />, // использую иконку из react-icons
          className: 'decrement',
          type: 'button', //! чтобы не сабмитилась форма
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

//! STYLES
const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: start;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

//! MAIN COMPONENT
interface IProps {
  register: UseFormRegister<FieldValues>; // от 'react-hook-form'
  errors: FieldErrors<FieldValues>; // от 'react-hook-form'
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, any>;
}

const StepTwo: FC<IProps> = ({ register, watch, control }) => {
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
        Шаг #2: Зависимость приёма
      </Typography>
      {/* //! Checkbox - вне зависимости */}
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Приём вне зависимости" // onClick={() => unregister('independently')} // если выбрано, то не отправлять (не регистрировать) значение полей name="action"
          {...register('independently')}
          name="independently"
          defaultChecked={false}
          sx={{ margin: '0' }}
        />
      </div>
      {/* //! Интервал времени */}
      <div className="interval">
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
          Интервал времени: введите время{' '}
        </Typography>
        <label htmlFor="intervalMinute">часы: </label>
        {/*//* Controller от "react-hook-form", чтобы взять данные с нестандартного поля MUI */}
        {/*// Обычный {...register()}  не ловит измененное значение*/}
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="interval.hour" //! имя поля
          defaultValue={0} // ? set defaultValue
          rules={{
            required: !watch('independently'), // если галочка нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently') || watch('position') == 'while', //? отправляет пустой объект "interval":{}}
          }}
          render={({ field }) => (
            // Компонент от Material-UI в данном файле (выше)
            <>
              <NumberInput
                disabled={
                  watch('independently') || watch('position') == 'while'
                } //? кнопки не активны
                placeholder="часы"
                aria-label="Quantity Input"
                min={0}
                max={24}
                id="intervalMinute"
                {...field} //! ловит значение (от react-hook-form)
                onChange={(_, value) => {
                  // событие изменение
                  field.onChange(value); //! присваивает значение
                }}
              />
            </>
          )}
        />

        <label htmlFor="intervalMinute">минуты: </label>
        <br />
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="interval.minute"
          defaultValue={0}
          rules={{
            required: !watch('independently'), // если галочка нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently') || watch('position') == 'while', //? отправляет пустой объект "interval":{}}
          }}
          render={({ field }) => (
            // Компонент от Material-UI в данном файле (выше)
            <>
              <NumberInput
                disabled={
                  watch('independently') || watch('position') == 'while'
                } //? кнопки не активны
                placeholder="минуты"
                aria-label="Quantity Input"
                // defaultValue={0}
                min={10}
                max={50}
                step={10}
                id="intervalMinute"
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
              />
            </>
          )}
        />
      </div>
    </FormStep>
  );
};

export default StepTwo;
