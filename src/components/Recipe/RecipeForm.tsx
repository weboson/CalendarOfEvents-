//! Нативный вариант формы с использованием встроенного в JS класса new FormData()
// инфа из видео: https://youtu.be/4-SOv7eTfoQ?t=511
// инфа из учебника: https://learn.javascript.ru/formdata
import { FC, useState } from 'react';


const RecipeForm: FC = () => {
  
  const [data, setData] = useState()

  const onSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target)

    const field = Object.fromEntries(formData)
    console.dir(formData.get('name')); // выдаст данные поля 'name'

    setData(field.name)

    event.target.reset() // просто очищает поля формы
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
     <input type="text" name='name' placeholder='name'/>
     <button type="submit">Search</button>
    </form>
    <p>{data}</p>
    </div>
  );
};

export default RecipeForm;
