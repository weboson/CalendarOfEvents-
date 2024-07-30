//* массив режимов отображения заголовка в Monitor.tsx, exemple: November 2023 (режим Month), 2023 (Year) 
// used CalendarGrid
interface IModesMonitorObj {
    id: number;
    title: 'days' | 'weeks' | 'months' | 'years' | 'recipes' | 'mealschedules' ; // for .subtract(1, 'days' | 'weeks' | etc)
  }
  
  interface IModesMonitor extends Array<IModesMonitorObj>{}
  
  // в данном проекте, значения менять не будем - толькот чтение по меняющемуся (active button) index. 
  // Просто учимся Rudax Toolkit)
export const modesMonitor: IModesMonitor = [
    {id: 1, title: 'days'}, 
    {id: 2, title: 'weeks'}, 
    {id: 3, title: 'months'}, 
    {id: 4, title: 'years'},
    {id: 5, title: 'recipes'}, // для RecipePage
    {id: 6, title: 'mealschedules'}, // для Mealschedules
  ]