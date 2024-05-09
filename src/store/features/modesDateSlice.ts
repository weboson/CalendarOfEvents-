// redux-toolkit - Slice (шаблон кода из документации)
// выбранная кнопка режима отомбражения календаря: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active menu (по-умолчанию)
//! если user уже нажал какую-то кнопку меню, то сохранится, как по-умолчанию и после обновления страницы сохранится
//! если впервые зашли, то активное меню (белый цвет) будет 0 (Day)
const initialState: number = +sessionStorage.getItem('IndexMenu') || 0;




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