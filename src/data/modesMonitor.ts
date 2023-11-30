//* массив режимов отображения заголовка в Monitor.tsx, exemple: November 2023 (режим Month), 2023 (Year) 
// used CalendarGrid.tsx
interface IModesMonitorObj {
    id: number;
    title: string;
  }
  
  interface IModesMonitor extends Array<IModesMonitorObj>{}
  
  // в данном проекте, значения менять не будем - толькот чтение по меняющемуся (active button) index. 
  // Просто учимся Rudax Toolkit)
export const modesMonitor: IModesMonitor = [
    {id: 1, title: 'day'}, 
    {id: 2, title: 'week'}, 
    {id: 3, title: 'month'}, 
    {id: 4, title: 'year'},
  ]