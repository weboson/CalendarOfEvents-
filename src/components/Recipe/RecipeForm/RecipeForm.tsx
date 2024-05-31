import { FC } from 'react';
import MyInput from './MyInput';
import { FromWrappeer } from '../stylesRecipePage/sc_RecipePage';
import { useForm } from 'react-hook-form'; // lib for forms

const RecipeForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать  форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  // formState - состояние формы
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <FromWrappeer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*  */}
        <h2>Добавьте медикамент</h2>
        {/* //! Название лекарства */}
        <h3>Наименование медикамента</h3>
        <div>
          <input
            {...register('title')}
            type="text"
            name="title"
            placeholder="Введите название лекарства"
            required
          />
        </div>
        {/* //! Количество приёмов */}
        <h3>Зависимость приёма</h3>
        <div>
          <label>
            <span>Приём в зависимости от: </span>
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
              <option value="firstBreakfast">Натощак</option>
            </select>

            <input
              onClick={() => unregister('dependingOn')} // если выбрано, то не отправлять значение полей name="dependingOn"
              {...register('noDependencies')}
              type="checkbox"
              name="noDependencies"
              defaultChecked={false}
            />
            <span>Приём вне зависимости. </span>
          </label>
        </div>

        <h3>Количество приёмов</h3>
        <label>
          <select
            {...register('quantity')}
            name="quantity"
            id="quantity"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
          </select>
          <span>раз/</span>
          <span>в </span>
          <select
            {...register('unitTime')}
            name="unitTime"
            id="unitTime"
            // disabled={watch('noDependencies')}
          >
            <option value="day">день</option>
            <option value="week">неделю</option>
            <option value="month">месяц</option>
          </select>
        </label>

        <input type="range" min="1" max="24" step="1" multiple />
        {/* кнопка отправки */}
        <input type="submit" />
      </form>
    </FromWrappeer>
  );
};

export default RecipeForm;
