//! Режим отображения Recopes
// redux-toolkit - Slice (шаблон кода из документации)
// Активная (выбранная) кнопка режима отомбражения календаря: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active menu (по-умолчанию)
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