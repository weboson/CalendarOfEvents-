//* Mealschedules sub menu - массив пунктов под меню на странице /Mealschedules
// used CalendarGrid.tsx
interface IMealschedulesSubMenu {
    id: number;
    title: string;
    UrlParams: string
    colorHeader: string
  }
  
  interface IArrayMealschedulesSubMenu extends Array<IMealschedulesSubMenu>{}
  
export const ArrayMealschedulesSubMenu: IArrayMealschedulesSubMenu = [
    {id: 1, title: 'Add new', UrlParams: '/mealschedules', colorHeader: 'Добавьте график питания'}, // страница рецептов
    {id: 2, title: 'Mealschedules', UrlParams: '/mealschedules', colorHeader: 'Список графиков питания'}, // страница рецептов
    
  ]