import { FC } from 'react';
import MyInput from './MyInput';
import { FromWrappeer } from '../stylesRecipePage/sc_RecipePage';
import { useForm } from 'react-hook-form'; // lib for forms

const RecipeForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать  форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  const { register, unregister, handleSubmit, watch } = useForm();

  const onSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <FromWrappeer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*  */}
        <h2>Добавьте лекарство:</h2>
        <input
          {...register('title')}
          type="text"
          name="title"
          placeholder="Введите название лекарства"
          required
        />

        <label>
          <input
            onClick={() => unregister("dependingOn")} // если выбрано, то не отправлять значение полей name="dependingOn"
            {...register('noDependencies')}
            type="checkbox"
            name="noDependencies"
            defaultChecked={false}
          />
          <span>Вне зависимости.</span>
        </label>

       
          
          <label>
            <span>В зависимости от: </span>
            <select
              {...register('dependingOn')}
              name="dependingOn"
              id="dependingOn"
              disabled={watch('noDependencies')}
            >
              <option value="eating">От еды</option>
              <option value="firstBreakfast">От завтрака</option>
              <option value="lastSupper">От ужина</option>
              <option value="sleep">От сна</option>
              <option value="firstBreakfast">На тощах</option>
            </select>
          </label>
        

        <input type="submit" />
      </form>
    </FromWrappeer>
  );
};

export default RecipeForm;
