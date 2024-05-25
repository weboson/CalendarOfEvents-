//! Форма с использованием библиотеки "react-hook-form"
import {FC} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// types form
import { FormValues } from './recipe.interface';

const RecipeForm:FC = () => {

  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data) // return object

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
};

export default RecipeForm;