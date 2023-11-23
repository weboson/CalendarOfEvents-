//* массив пунктов меню 
// used CalendarGrid.tsx
interface IModeDate {
    id: number;
    title: string;
    format: string
  }
  
  interface IMenuModesDate extends Array<IModeDate>{}
  
  // в данном проекте, значения менять не будем - толькот чтение по меняющемуся (active button) index. 
  // Просто учимся Rudax Toolkit)
export  const menuModesDate: IMenuModesDate = [
    {id: 1, title: 'Day', format: 'D'}, //! еще доработать остальные
    {id: 2, title: 'Week', format: 'WWW'}, // дни недели
    {id: 3, title: 'Month', format: 'D'}, // дни месяца
    {id: 4, title: 'Year', format: 'YYYY'},
  ]