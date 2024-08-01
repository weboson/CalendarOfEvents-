//! Режим отображения Recopes
// redux-toolkit - Slice (шаблон кода из документации)
// Активная (выбранная) кнопка режима отомбражения календаря: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active menu (по-умолчанию)
// сохраняется только цифра 0 или 1 (ведь 2 пункта в меню recipeMenu)
// если user не нажал кнопку в меню в /recipes, то будет 0, если нажал, то сохранится в sessionStorage и восстановится после обновления страницы
// сохраняется в обработчике onClick в src\components\Recipe\RecipeMenu.tsx
const initialState: number = (+sessionStorage.getItem('modeRecipeMenu') >= 0 ) ? +sessionStorage.getItem('modeRecipeMenu') : 0;



export const recipeMenuSlice = createSlice({
  name: 'recipeMenu',
  initialState,
  reducers: {
    readingRecipeMenu: (state, action) => (
      state = action.payload // наприме: RecipeForm или RecipeList (из RecipeMenu.ts)
    )
  },
})

export const { readingRecipeMenu } = recipeMenuSlice.actions

export const selectCount = (state: RootState) => state.recipeMenu

export default recipeMenuSlice.reducer