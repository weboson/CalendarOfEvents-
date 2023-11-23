//* массив пунктов меню 
// used CalendarGrid.tsx
interface IModeDate {
    id: number;
    title: string;
    format: string
  }
  
  interface IMenuModesDate extends Array<IModeDate>{}
  
  // значение по умолчанию (в данном проекте значения менять не будем - просто учимся Rudax Toolkit)
export  const menuModesDate: IMenuModesDate = [
    {id: 1, title: 'Day', format: 'D'},
    {id: 2, title: 'Week', format: 'WWW'},
    {id: 3, title: 'Month', format: 'MMMM'},
    {id: 4, title: 'Year', format: 'YYYY'},
  ]