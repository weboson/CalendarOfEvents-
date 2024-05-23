//! Вариант со общим состоянием, для всей формы (setFormData)
import { useState } from "react";

export default function Multiple() {
  const [formData, setFormData] = useState({name: "",email: "",message: ""});

  // при каждом вводе в определенного поля, 
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name)
    // [name] - потому что в form (HTMLFormElement.length) несколько элементов управления (input) с атрибутом "name" (сам недоконца понял)
    //  иначе вводить можно будет только в первый элемент формы (поле "name")
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value })); 
  };

  // событие для submit (просто alert), может быть и отправка на сервер
  const handleSubmit = (event) => {
    event.preventDefault(); 
    alert(`Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
    );
};

  return (
    <>    
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange}/>

      <button type="submit">Submit</button>
    </form>
    <div>
      {/* отображение вводимых данных */}
      <br />
      {formData.name}
      <br />
      {formData.email}
      <br />
      {formData.message}
    </div>
    </>
  );
}