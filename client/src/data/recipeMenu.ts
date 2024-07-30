//* Recipe menu - массив пунктов меню на странице /recipes
// used CalendarGrid.tsx
interface IRecipeMenu {
    id: number;
    title: string;
    UrlParams: string
  }
  
  interface IArrayRecipeMenu extends Array<IRecipeMenu>{}
  
  // в данном проекте, значения менять не будем - только чтение по меняющемся (active button) index. 
  // Просто учимся Rudax Toolkit)
export const ArrayRecipeMenu: IArrayRecipeMenu = [
    {id: 1, title: 'Add new', UrlParams: '/recipes'}, // страница рецептов
    {id: 1, title: 'Recipes', UrlParams: '/recipes'}, // страница рецептов
    
  ]