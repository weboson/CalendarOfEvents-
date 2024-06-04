import { FC } from 'react';
import MyInput from './MyInput';
import { FromWrappeer } from '../stylesRecipePage/sc_RecipePage';
import { useForm } from 'react-hook-form'; // lib for forms
import { DoubleScrollBar } from './DoubleScrollBar/DoubleScrollBar';

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
        <h3>Зависимость приёма</h3>
      {/* //! вне зависимости */}
    <div>
    <input
            onClick={() => unregister('dependingOn')} // если выбрано, то не отправлять значение полей name="dependingOn"
            {...register('noDependencies')}
            type="checkbox"
            name="noDependencies"
            defaultChecked={false}
          />
          <span>Приём вне зависимости. </span>
    </div>

        {/* //! Интервал времени */}
        <div className="inerval">
          <h4>Интервал времени</h4>
          <small>*Например: принять за 30 минут (до еды)</small>
          <br />
          <label htmlFor="appt">Выберете время: </label>

          <input
            {...register('interval', {
              disabled: watch('positionAction') == 'while' //! если в поле "positionAction" == 'while' (вовремя), то не активна (варинат от библиотеки)
            })}
            
            type="time"
            id="interval"
            name="interval"
            min={'00:00'}
            max={'24:00'}
            // step={"0:30"}
            // required
            defaultValue={'00:30'}
          />
        </div>
        {/* //! До, вовремя, после */}
        <div>
        <h4>Особенности приёма: </h4>
          <label>
            <span>Принимать лекарство: </span>
            <select
              {...register('positionAction')}
              name="positionAction"
              id="positionAction"
              disabled={watch('noDependencies')} // если галочка то не активна
            >
              <option value="before">перед</option>
              <option value="while">вовремя</option>
              <option value="after">после</option>
            </select>
            {/* //! еда, завтрак, ужин... */}
            <select
              {...register('dependingOn')}
              name="dependingOn"
              id="dependingOn"
              disabled={watch('noDependencies')} // если галочка то не активна
            >
              <option value="eating">приёма пищи</option>
              <option value="firstBreakfast">завтрака</option>
              <option value="lastSupper">ужина</option>
              <option value="sleep">сон</option>
              <option value="firstBreakfast">*натощак</option>
            </select>
          </label>
        </div>

        {/* //! Количество приёмов */}
        <h3>Количество приёмов</h3>
        <label>
          <select {...register('quantity')} name="quantity" id="quantity">
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
        {/* Диапозон режима сна */}
        <h3>Режим дня и питания</h3>
        <small>
          *Советуем уделять время сну, не менее 8 часов. И принимать пищу не
          менее 3 раз в день
        </small>

        {/* В будни */}

        <div className="wrapper-2">
          <h4>В будни:</h4>
          <span id="display2"></span>

          <DoubleScrollBar
            key={'range2'}
            min={1}
            max={24}
            step={1}
            forid="display2"
            classElem="SB-2"
          />
        </div>

        {/* В выходные */}
        <h4>В выходные</h4>
        <div className="wrapper-3">
          <DoubleScrollBar
            key={'range3'}
            min={1}
            max={24}
            step={1}
            forid="display3"
            classElem="SB-3"
          />
          <div id="display3"></div>
        </div>
        {/* <input type="range" min="1" max="24" step="1" multiple /> */}
        {/* кнопка отправки */}
        <input type="submit" />
      </form>
    </FromWrappeer>
  );
};

export default RecipeForm;
