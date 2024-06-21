//! Step 1: поле для названия лекарства
import { FC } from 'react';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Iprops {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>
}


const StepOne:FC<Iprops> = ({register, errors}) => {
    return (
        <>  
          <FormStep>
            <Box component="section">
              <Typography
                id='stepTitle'
                variant='h6'
                component="h6"
                // align="start"
                sx={{
                  fontSize: '1.6em',
                  color: '#6f6e6e',
                  margin: '2%',
                }}
              >
                Шаг #1: Добавьте лекарство
              </Typography>
              
              {/* //! Название лекарства */}
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
                Наименование лекарства:{' '}
              </Typography>
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiMedicineBottleLine />
                      </InputAdornment>
                    ),
                  }}
                  color="success"
                  // fullWidth // полный размер (эквивалентно width: 100%)
                  sx={{ fontSize: '2px', margin: '2%', width: '96.5%'}} // при 100% и padding: 2%  - "label" сдвигается.
                  label={errors?.title && 'Только буквы'}
                  error={!!errors?.title}
                  // от react-form-hook
                  {...register('title', {
                    pattern: /[a-zа-яё ]/, // только буквы (без цифр)
                  })}
                  type="text"
                  name="title"
                  placeholder="Название лекарства"
                  helperText="Введите название лекарства"
                  required
                />
              </div>
            </Box>
          </FormStep>
        </>
    );
};

export default StepOne;