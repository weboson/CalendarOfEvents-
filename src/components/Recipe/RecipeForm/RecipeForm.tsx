import { FC, useEffect } from 'react';
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
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm({
    mode: 'onChange', //! режим реагирования на изменение
  });

  // решил прямо в атрибутах input выполнить этот код
  // установка даты по-умолчанию через useEffect в input type="date"  
  // useEffect(() => {
  //   document.querySelector('#startDate')!.value = (new Date()).toJSON().slice(0,10)
  // }, []);

  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <>
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
              // onClick={() => unregister('independently')} // если выбрано, то не отправлять (не регистрировать) значение полей name="action"
              {...register('independently')}
              type="checkbox"
              name="independently"
              defaultChecked={false}
            />
            <span>Приём вне зависимости. </span>
          </div>

          {/* //! Интервал времени */}
          <div className="interval">
            <h4>Интервал времени</h4>

            <span>Введите время: </span>
            <small>*Например: принять за 30 минут (до еды)</small>
            <br />
            <label htmlFor="intervalHour">часы: </label>
            <input
              id="intervalHour"
              type="number"
              {...register(
                'interval.hour',
                { min: 0, max: 24 }, // валидация
              )}
              disabled={watch('independently') || watch('position') == 'while'} //! условия на активное или неактивное
              defaultValue="0"
            />
            {/* вывод ошибки */}
            {errors?.interval && (
              <div style={{ color: 'red' }}>Введите число от 0 до 24</div>
            )}
            <br />
            <label htmlFor="intervalMinute">минуты: </label>
            <input
              id="intervalMinute"
              type="number"
              {...register('interval.minute', { min: 0, max: 59 })}
              disabled={watch('independently') || watch('position') == 'while'} //! условия на активное или неактивное
              defaultValue="30"
            />
          </div>
          {/* вывод ошибки */}
          {errors?.interval && (
            <div style={{ color: 'red' }}>Введите число от 0 до 59</div>
          )}

          {/* //! До, вовремя, после */}
          <div>
            <h4>Особенности приёма: </h4>
            <label>
              <span>Принимать лекарство: </span>
              <select
                {...register('position')}
                name="position"
                id="position"
                disabled={watch('independently')} // если галочка то не активна
              >
                <option key={'before'} value="before">
                  перед
                </option>
                <option key={'while'} value="while">
                  вовремя
                </option>
                <option key={'after'} value="after">
                  после
                </option>
              </select>
              {/* //! еда, завтрак, ужин... */}
              <select
                {...register('action')}
                name="action"
                id="action"
                disabled={watch('independently')} // если галочка то не активна
              >
                <option key={'eating'} value="eating">
                  приём пищи
                </option>
                <option key={'firstBreakfast'} value="firstBreakfast">
                  завтрак
                </option>
                <option key={'lastSupper'} value="lastSupper">
                  ужин
                </option>
                <option key={'sleep'} value="sleep">
                  сон
                </option>
              </select>
            </label>
          </div>

          {/* //! Количество приёмов */}
          <h3>Количество приёмов</h3>
          <label>
            <input
              type="number"
              {...register('quantity')}
              name="quantity"
              id="quantity"
              defaultValue={'3'}
            />
            <span>раз[a]/</span>
            <span>в </span>
            <select {...register('unitTime')} name="unitTime" id="unitTime">
              <option key={'day'} value="day">
                день
              </option>
              <option key={'week'} value="week">
                неделю
              </option>
              <option key={'month'} value="month">
                месяц
              </option>
            </select>
          </label>
          {/* Диапозон режима сна */}
          <h3>Режим дня и питания</h3>
          <small>
            *Советуем уделять время сну, не менее 8 часов. И принимать пищу не
            менее 3 раз в день
          </small>

          {/* В будни */}

          <div className="wrapper-1">
            <h4>В будни:</h4>
            <span id="display1"></span>

            <DoubleScrollBar
              register={register}
              key={'range1'}
              min={1}
              max={24}
              step={1}
              forid="display1"
              classElem="weekday"
            />
          </div>

          {/* В выходные */}
          <div className="wrapper-3">
            <h4>В выходные</h4>
            <span id="display3"></span>
            <DoubleScrollBar
              register={register}
              key={'range3'}
              min={1}
              max={24}
              step={1}
              forid="display3"
              classElem="weekend"
            />
          </div>

          {/* //! Курс приёма */}
          <div>
            <h4>Курс (продолжительноть приёма ЛС)</h4>
            <input
              type="text"
              defaultValue={'1'}
              {...register('duration.index')}
            />
            <select
              id="duration"
              {...register('duration.title')}
              name="duration"
              defaultValue={'months'}
            >
              <option key={'days'} value="days">
                день{' '}
              </option>
              <option key={'weeks'} value="weeks">
                неделя
              </option>
              <option key={'months'} value="months">
                месяц
              </option>
              <option key={'years'} value="years">
                год
              </option>
            </select>
          </div>

          {/* //! дата старта */}
          <h4>Старт курса:</h4>
          <div>
            <label htmlFor="startDate"></label>
            {/* дата по-умолчанию устанавливается JS в useEffect */}
            <input
              {...register('start')}
              name="start"
              type="date"
              id="startDate"
              value={(new Date()).toJSON().slice(0,10)} // '2024-06-10T15:42:33.895Z' -> slice(0,10) -> '2024-06-10'
            />
          </div>
          {/* //! кнопка отправки */}
          <input type="submit" />
        </form>
      </FromWrappeer>
    </>
  );
};

export default RecipeForm;
