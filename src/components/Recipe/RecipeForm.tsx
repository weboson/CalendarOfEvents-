import { useState } from 'react';
// import { useEffect } from "react";

// export default function  RecipeForm()  {
// 	const  [inputValue, setInputValue] =  useState('');

// 	const  handleChange = (event) => {
// 		setInputValue(event.target.value);
// 	};

// return  (
// <form>
// 	<label>Input Value:
// 	<input  type="text" value={inputValue} onChange={handleChange} />
// 	</label>
// 	<p>Input Value: {inputValue}</p>
// </form>
// )
// }

// export default function Search() {
//     const elem = document.querySelector('form')
//     const formData = new FormData(elem)

//     function search(e) {
//     }
//     return (
//       <form onSubmit={search} id="form">
//         <input name="query" />
//         <input type="submit" onSubmit={search}></input>
//       </form>
//     );
//   }

// export default function Search() {

//     useEffect(() => {
//         let formData = new FormData(form);
//         const query = formData.get("query");
//         alert(`You searched for '${query}'`);
//       }, [])

//     function search(e) {
//         // e.preventDefault()

//     }
//     return (
//       <form name="form" onSubmit={search}>
//         <input name="query" value="sfdsdfsd"/>
//         <button type="submit">Search</button>
//       </form>
//     );
//   }

import { FC } from 'react';

const RecipeForm: FC = () => {
  const [name, setName] = useState({ name: '' });
  const [password, setPassword] = useState({ password: '' });
  const [email, setEmail] = useState({ email: '' });
  const [checkbox, setCheckbox] = useState(true);
  

  const onsub = () => {
    // await fetch(...) or axios
    alert(
      `name: ${name.name}, password: ${password.password}, email: ${email.email}, checkbox: ${checkbox}`,
    );
  };

  return (
    <form
      // onSubmit={() => alert(name.name)}
      onSubmit={onsub}
    >
      <input
        placeholder="Name"
        onChange={(e) => setName({ name: e.target.value })}
      />
      <input
        placeholder="Password"
        onChange={(e) => setPassword({ password: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail({ email: e.target.value })}
      />
      <br />
      <label htmlFor="isHappy">Вне зависимости</label>
      <input
        type="checkbox"
        id="isHappy"
        onChange={(e) => setCheckbox(e.target.checked)}
      />
      <br /> 
      {/* //! если нет галочки на "Вне зависимости", то появляются варианты: еда, завтра и т.д. */}
      {!checkbox && (
        <>
          <label htmlFor="isHappy">В зависимости от:</label>

          <select name="dependence" id="dependence">
            <option value="">В зависисости от</option>
            <option value="eat">еды</option>
            <option value="breakfast">завтрака</option>
            <option value="dinner">ужина</option>
            <option value="dream">сна</option>
          </select>
        </>
      )}
      <br />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default RecipeForm;
