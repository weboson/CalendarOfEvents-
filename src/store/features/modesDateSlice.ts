// redux-toolkit - Slice (шаблон кода из документации)
// выбранная кнопка режима отомбражения календаря: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active menu (по-умолчанию)
// const initialState: number = +sessionStorage.getItem('IndexMenu') || 0; // old option
// если страница /recipes, то активная кнопка (белая) будет 4-я, то есть "recipes", если '/' (home) то 0 ("Day")
// или если user уже нажимал кнопку меню, то она запомнится (в sessionStorage) и воссоздатся.
const initialState: number = (window.location.pathname == '/recipes') ? 4 : +sessionStorage.getItem('IndexMenu') ? 0 : 0




export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    readingMenu: (state, action) => (
      state = action.payload // наприме: {id: 3, title: 'Month', format: 'MMMM'} (из dataMenu.ts)
    )
  },
})

export const { readingMenu } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.menu

export default menuSlice.reducer