//* Массив пунктов для submenu - как для /Recipes, так и для /Mealschedules
// used CalendarGrid.tsx
interface ISubMenu {
  id: number;
  title: string;
  UrlParams: string
  colorHeader: string
}

interface IArrSubMenu extends Array<ISubMenu> { }


export const ArrSubMenu: IArrSubMenu = [
  // for Recipes Sub Menu
  { id: 1, title: 'Add new', UrlParams: '/recipes', colorHeader: 'Добавьте рецепт' }, // страница рецептов
  { id: 2, title: 'Recipes', UrlParams: '/recipes', colorHeader: ' Список рецептов' }, // страница рецептов
  // for Mealschedules Sub Menu
  { id: 3, title: 'Add new', UrlParams: '/mealschedules', colorHeader: 'Укажите свой график питания' }, // страница графиков питания
  { id: 4, title: 'Mealschedules', UrlParams: '/mealschedules', colorHeader: ' Список графиков' }, // страница графиков питания
]